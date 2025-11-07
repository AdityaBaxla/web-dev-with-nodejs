import express, { Request, Response, NextFunction } from "express";
import { validate } from "uuid";
import { AppDataSource } from "./data-source";
import { Task } from "./entity/Task";

const taskRepository = AppDataSource.getRepository(Task);

const app = express();

app.use(express.json());

function validateTaskBody(req: Request, res: Response, next: NextFunction) {
    const { name, deadline } = req.body;
    if (!name || !deadline) {
        return res
            .status(400)
            .json({ error: "Both name and deadline are required." });
    }
    next();
}

// Create a Task
app.post("/task", validateTaskBody, async (req: Request, res: Response) => {
    const { name, deadline, reminderAt } = req.body;

    const insertResult = await taskRepository.insert({
        name,
        deadline: new Date(deadline),
        reminder_at: reminderAt ? new Date(reminderAt) : undefined,
    });

    res.status(201).json(insertResult.identifiers[0]);
});

// Get all Tasks
app.get("/tasks", async (req: Request, res: Response) => {
    const tasks = await taskRepository.find();
    res.json(tasks);
});

// Get a desired task
app.get("/task/:id", async (req: Request, res: Response) => {
    if (!validate(req.params.id))
        return res.status(404).json({ error: "Invalid ID" });
    const task = await taskRepository.findOne({
        where: { id: req.params.id },
    });
    if (!task) res.status(404).json({ error: "Task Not Found !!" });
    res.json(task);
});

// Update a Task
app.put("/task/:id", async (req: Request, res: Response) => {
    if (!validate(req.params.id))
        return res.status(404).json({ error: "Invalid ID" });

    const task = await taskRepository.findOne({
        where: { id: req.params.id },
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    const { name, deadline, reminderAt } = req.body;

    task.name = name ?? task.name;
    task.deadline = deadline ? new Date(deadline) : task.deadline;
    task.reminder_at = reminderAt ? new Date(reminderAt) : task.reminder_at;

    await taskRepository.save(task);

    res.json(task);
});

// Delete a Task
app.delete("/task/:id", async (req: Request, res: Response) => {
    if (!validate(req.params.id))
        return res.status(404).json({ error: "Invalid ID" });
    const task = await taskRepository.findOne({
        where: { id: req.params.id },
    });
    if (!task) res.status(404).json({ error: "Task Not Found !!" });

    await taskRepository.delete({ id: req.params.id });

    res.status(200).send("Task Deleted !!");
});

// Mark a Task as Completed
app.post("/task/:id/complete", async (req: Request, res: Response) => {
    if (!validate(req.params.id))
        return res.status(404).json({ error: "Invalid ID" });
    const task = await taskRepository.findOne({
        where: { id: req.params.id },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    task.completed_at = new Date();
    await taskRepository.save(task);
    res.json(task);
});

// Fetch all tasks with reminder at set to time with in 1 hour
app.get("/tasks/reminders/upcoming", async (req: Request, res: Response) => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const tasks = await taskRepository.find();

    const reminders = tasks.filter(
        (task) =>
            task.reminder_at &&
            task.reminder_at > now &&
            task.reminder_at <= oneHourLater
    );
    res.json(reminders);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Internal Server Error:", err.message);
    res.status(500).json({ error: "Something went wrong!" });
});

AppDataSource.initialize()
    .then(async () => {
        console.log("DB Connection Successful !!");

        const query = await AppDataSource.query("Select now()");
        console.log(query);

        const PORT = 8080;
        app.listen(PORT, () => {
            console.log("Server is running at port 8080");
        });
    })
    .catch((error) => console.log("Error in DB Connection", error));

import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = 8080;

// app.use((req: Request, res: Response, next: NextFunction) => {
//     const timestamp = new Date().toISOString();
//     console.log(`[${timestamp} ${req.method} ${req.url}]`);
//     next();
// });

// app.use((req: Request, res: Response, next: NextFunction) => {
//     (req as any).requestedAt = new Date().toLocaleString();
//     next();
// });

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const secret = req.query.secret;
    if (secret === "123") {
        next(); // allow​
    } else {
        res.status(401).json({ error: "Unauthorized access" });
    }
};

// app.get("/", authenticate, (req: Request, res: Response) => {
//     res.send("You have accessed a protected route !!");
// });

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error("Something went wrong");
    next(err);
});

app.get("/data", (req: Request, res: Response) => {
    res.send("Received a GET request");
});

app.post("/data", (req: Request, res: Response) => {
    res.send("Received a POST request");
});

app.delete("/data", (req: Request, res: Response) => {
    res.send("Received a DELETE request");
});

app.post("/hello", (req: Request, res: Response) => {
    res.send(
        `Hello from express and typescript app !! ${(req as any).requestedAt}`
    );
});

app.get("/about", (req: Request, res: Response) => {
    res.send("This is a about page !!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("ERROR:", err.message);
    res.status(500).json({
        status: "error",
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log("Server is running at port 8080");
});

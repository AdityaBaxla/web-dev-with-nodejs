import { DataSource } from "typeorm";
import { Task } from "./entity/Task";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Abhi@123",
    database: "task_manager",
    synchronize: true,
    logging: false,
    entities: [Task],
    subscribers: [],
    migrations: [],
});

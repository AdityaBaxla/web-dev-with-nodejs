import express from "express";
import { config } from "dotenv";
import cors from "cors";

//dotenv configuration
config({ path: `./environments/.env.${process.env.NODE_ENV}` });

//database's
import { DatabaseConnection } from "./config/DatabaseConnection";

//errors
import { ErrorResponse } from "./errors/ErrorResponse";

//rouuters
import V1Router from "./routers/V1Router";

//class server
class Server {
    private _app = express();
    private _router_v1 = V1Router;

    async init() {
        await this._configure();
    }

    get app() {
        return this._app;
    }

    get router_v1() {
        return this._router_v1;
    }

    private async _configure() {
        await DatabaseConnection.getInstance().init();
    }
}

//instance of server class
const server = new Server();

(async () => {
    // initializing server
    await server.init();

    //middlewares
    server.app.use(express.json());
    server.app.use(cors());

    server.app.post("/test", (req, res) => {
        console.log(req.body);
        res.send("ok");
    });

    //routers
    server.app.use("/api/v1", server.router_v1);

    //middleware for error handling.
    server.app.use(ErrorResponse.defaultMethod);

    const port = process.env.PORT || 8080;
    server.app.listen(port, () =>
        console.log(`Server is running on port ${port}`)
    );
})();

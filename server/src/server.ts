import express, {type Express}  from "express"
import routes from "./routes";
import cors from "cors"

const app: Express = express();

export default app;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(routes);

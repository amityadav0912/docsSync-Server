import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import db from './db/models';
import router from "./routes";
import cors from "cors"
import errorHandler from './middleware/error-handler';


dotenv.config();
const app:Express = express();
const port = 8080;

app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
)
app.use(router);
app.use(errorHandler);
db.sequelize.sync().then(() => {
    console.log('Database connected and tables created');
  }).catch((err) => {
    console.error('Error connecting to database:', err);
  });

app.get('/', (req:Request, res: Response)=>{
    res.send('Express + Typescript server');
})

app.listen(port, ()=>{
    console.log(`Server is running on this port: ${port}`);
})
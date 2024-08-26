import { Sequelize } from "sequelize-typescript";
import env from "./env.config";


const sequelize =
    env.NODE_ENV === "test" || env.NODE_ENV ===  "development"
    ? new Sequelize("docsSync", "postgres", "9413912029", {
        host:"localhost",
        dialect: "postgres",
        logging: false,
    })
    : new Sequelize("postgres://postgres:9413912029@localhost:5432/docsSync", {
        dialect: "postgres",
        dialectOptions:{
            ssl:{
                require:true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    });

    export default sequelize;
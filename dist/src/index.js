"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = __importDefault(require("./db/models"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 8080;
app.use(routes_1.default);
models_1.default.sequelize.sync().then(() => {
    console.log('Database connected and tables created');
}).catch((err) => {
    console.error('Error connecting to database:', err);
});
app.get('/', (req, res) => {
    res.send('Express + Typescript server');
});
app.listen(port, () => {
    console.log(`Server is running on this port: ${port}`);
});

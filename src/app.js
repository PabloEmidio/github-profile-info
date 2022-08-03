import express from "express";
import path from "path";
import {fileURLToPath} from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName)


const app = express();

const pathTemplates = path.join(__dirname, 'templates');


app.use('/static', express.static(path.join(__dirname, 'static')));


app.get('/', (req, res) => {
   res.sendFile(path.join(pathTemplates, 'index.html'));
})

export { app };

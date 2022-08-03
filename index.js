import { app } from './src/app.js';


const port = 8000;


app.listen(port, () => {
  console.log(`Apllication started on port http://127.0.0.1:${port}`);
})

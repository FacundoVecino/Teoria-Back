import express from "express";
import morgan from "morgan";
import cors from "cors";

import userRouter from "./routes/userRoutes.js"

// 1. Iniciar la aplicacion
const app = express();

// 2. Configuraciones generales
const PORT = process.env.PORT || 5000;

// 3. Middlewares
app.use(morgan("dev")); // Genera console.log que brindan informacion cada vez que se conectan al servidor

//CROSS-ORIGIN-RESOURCE-SHARING
app.use(cors()) // (Modo puta) 
/* app.use(cors({
    origin: "https://rollingcode.com"   Sirve para especificar la conexion entre distintas url
})) */

app.use(express.json()) // Le dice a la aplicacion que se prepare para recibir en formato json

// 4. Rutas
app.use(userRouter)

// 5. Iniciar el loop del servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`)
});

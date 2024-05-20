import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { fileURLToPath } from 'url';
import { dirname } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// language
i18next
  .use(Backend)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json'
    }
  });


// db
import connectMongo from "./db/db.js";

// routes
import authRoutes from "./routes/auth.routes.js";

const app = express();
dotenv.config();
app.use(express.json());  
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));


app.use("/auth", authRoutes);


// language route
app.get('/locales/:lng/translation.json', (req, res) => {
    const language = req.params.lng;
    const translationFilePath = `${__dirname}/locales/${language}/translation.json`;
    res.sendFile(translationFilePath);
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    connectMongo();
    console.log(`Chex Running on ${PORT}`)
});
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.mjs";
import recipeRoutes from "./routes/recipes.mjs";
import cuisinesRoutes from "./routes/cuisines.mjs";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

import mongoose from "mongoose";
mongoose
  .connect(process.env.MONGODB_API_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.json());

app.post("/api/email", (req, res) => {
  const { names, email, message } = req.body;

  const msg = {
    to: "mkgardas@gmail.com", // Change to your recipient
    from: "elisabeth.cardellav@gmail.com", // Change to your verified sender
    subject: "Voyages Marrakech- message from " + names,
    text: "Voici le message envoyé : " + message,
    html:
      "Voici le message envoyé par " +
      names +
      "avec l'adresse " +
      email +
      ": " +
      message,
  };

  sgMail.send(msg).then(
    () => {
      res.json({ message: "Congratuations!" });
    }, // is it is a success cause this function
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api/auth", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/cuisines", cuisinesRoutes);

// app.get("/user", (req, res) => {
//   let user = req?.query?.mail;
//   let password = req?.query?.password;

//   if (user === "elisabeth.cardellav@gmail.com" && password === "1234567") {
//     res.send(data);
//   }
// });

// app.post("/user"),
//   (req, res, next) => {
//     console.log(req.body);
//     res.status(201).jsn({ message: "objet crée" });
//   };

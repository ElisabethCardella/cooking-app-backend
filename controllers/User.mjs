import bcrypt from "bcrypt";
import User from "../models/User.mjs";
import jwt from "jsonwebtoken";

const signup = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    user
      .save()
      .then(() => res.status(201).json({ message: "user created !" }))
      .catch((error) => res.status(400).json({ error }));
  });
  // .catch(error => res.status(500).json({error}));
};

const login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            user: user,
            token: jwt.sign({ user }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// const login = (req, res, next) => {
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (user === null) {
//         res.status(401).json({ message: "Id and/or password incorrect" });
//       } else {
//         // bcrypt
//         // .compare(req.body.password, user.password)
//         //   .then((valid) => {
//         if (user.password !== req.body.password)
//           res.status(401).json({ message: "Id and/or password incorrect" });
//         else {
//           res.status(200).json(user);
//         }
//         // })
//         // .catch((error) => res.status(500).json({ error }));
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({ error });
//     });
// };

export default { signup, login };

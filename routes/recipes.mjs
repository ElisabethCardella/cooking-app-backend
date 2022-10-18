import express from "express";
const router = express.Router();
// import auth from "../middleware/auth.mjs";
import recipeCtrl from "../controllers/recipes.mjs";

router.post("/", recipeCtrl.create);
router.get("/", recipeCtrl.get);
// /recipes/123/favourite?userId=123
router.patch("/:recipeId/favourite", recipeCtrl.favourite);
router.patch("/:recipeId/unfavourite", recipeCtrl.unfavourite);
// /recipes/123/unfavourite?userId=123

export default router;

// router.get("/", recipeCtrl.getAllrecipe);
// router.get("/", getOnerecipe);
// router.put("/", modifyrecipe);
// router.delete("/", deleterecipe);

// router.post("/", (req, res, next) => {
//   const recipe = new recipe({
//     name: req.body.name,
//     cuisine: req.body.cuisine,
//     description: "",
//     image: req.body.image,
//     rating: "",
//     time: req.body.time,
//     difficulty: "",
//     numberOfPerson: "",
//     ingredients: req.body.ingredients,
//     steps: req.body.steps,
//     userId: req.body.userId,
//   });
//   recipe
//     .save()
//     .then(() => {
//       res.status(201).json({
//         message: "My Own Recipe recipe saved successfully!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// });

// router.get("/:id", (req, res, next) => {
//   recipe.findOne({
//     _id: req.params.id,
//   })
//     .then((recipe) => {
//       res.status(200).json(recipe);
//     })
//     .catch((error) => {
//       res.status(404).json({
//         error: error,
//       });
//     });
// });

// router.put("/:id", (req, res, next) => {
//   const recipe = new recipe({
//     _id: req.params.id,
//     name: req.body.name,
//     cuisine: req.body.cuisine,
//     description: "",
//     image: req.body.image,
//     rating: "",
//     time: req.body.time,
//     difficulty: "",
//     numberOfPerson: "",
//     ingredients: req.body.ingredients,
//     steps: req.body.steps,
//     userId: req.body.userId,
//   });
//   recipe.updateOne({ _id: req.params.id }, threcipeing)
//     .then(() => {
//       res.status(201).json({
//         message: "Thing updated successfully!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// });

// router.delete("/:id", (req, res, next) => {
//   recipe.deleteOne({ _id: req.params.id })
//     .then(() => {
//       res.status(200).json({
//         message: "Deleted!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// });

// router.get("/" + "", (req, res, next) => {
//   recipe.find()
//     .then((recipe) => {
//       res.status(200).json(recipe);
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// });

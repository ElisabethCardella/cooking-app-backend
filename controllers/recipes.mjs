import recipes from "../models/recipes.mjs";
import Recipe from "../models/recipes.mjs";

const create = (req, res, next) => {
  const recipe = new Recipe({
    name: req.body.name,
    cuisine: req.body.cuisine,
    description: "",
    image: req.body.image,
    rating: "",
    time: req.body.time,
    difficulty: "",
    numberOfPerson: "",
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    userId: req.body.userId,
    favouritedBy: [],
  });
  recipe
    .save()
    .then((recipe) => {
      res.status(201).json({
        message: "My Own Recipe Recipe created successfully!",
        recipe,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

const transformRecipes = (apiRecipes) => {
  console.log(apiRecipes[0]);
  return apiRecipes.map((apiRecipe) => ({
    name: apiRecipe.recipe.label,
    cuisine: apiRecipe.recipe.cuisineType,
    description: "",
    image: apiRecipe.recipe.image,
    rating: "",
    time: apiRecipe.recipe.totalTime,
    difficulty: "",
    numberOfPerson: "",
    ingredients: apiRecipe.recipe.ingredients.map(
      (ingredient) => ingredient.text
    ),
    steps: apiRecipe.recipe.instructions,
    // userId: req.body.userId,
  }));
};

const getExternalRecipes = (req, res) => {
  let cuisine = req?.query?.cuisine;
  let text = req?.query?.text;

  let url =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=497062e0&app_key=0c8c9fb7eeed9309e3ff8af25fbcda8c";

  if (text) {
    url += "&q=" + text;
  }

  if (cuisine) {
    url += "&cuisineType=" + cuisine;
  }

  console.log(url);

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      res.send(transformRecipes(data.hits));
    })
    .catch((err) => console.log("Error:", err));
};

const getInternalRecipes = (req, res) => {
  let userId = req?.query?.userId;
  Recipe.find({ userId })
    .then((recipes) => {
      return res.send(recipes);
    })
    .catch((error) => res.status(500).json({ error }));
};

const getFavouriteRecipes = (req, res) => {
  let favouritedBy = req?.query?.favouritedBy;
  Recipe.find({ favouritedBy })
    .then((recipes) => {
      return res.send(recipes);
    })
    .catch((error) => res.status(500).json({ error }));
};

const get = (req, res) => {
  let recipeType = req?.query?.type;
  let favouritedBy = req?.query?.favouritedBy;

  if (recipeType === "external") {
    // if FE sends request to localhost/recipes?type=external
    getExternalRecipes(req, res);
  }

  if (recipeType === "internal") {
    // if FE sends request to localhost/recipes?type=internal
    getInternalRecipes(req, res);
  }

  if (favouritedBy) {
    // if FE sends request to localhost/recipes<<<<
    getFavouriteRecipes(req, res);
  }
};

// Example URL: /recipes/123/favourite?userId=123
// const favouriteOld = (req, res) => {
//   let userId = req?.query?.userId;
//   let recipeId = req.params.recipeId;

// Step 1. Go to the recipes collection (Recipe.findOne({ recipeId: recipeId })) and get recipe with recipeId

// Step 2. Push userId to favouritedBy

// Step 3. Save the recipe that was just updated

//   Recipe.findOne({ _id: recipeId })
//     .then((recipe) => {
//       recipe.favouritedBy.push(userId)
//       await recipe.save();

//       return res.send(recipe);
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

// Example URL: /recipes/123/favourite?userId=567
const favourite = async (req, res) => {
  let userId = req?.body?.userId; // get userId from URL
  let recipeId = req.params.recipeId; // get recipeId from URL

  try {
    let recipe = await Recipe.findOne({ _id: recipeId }); // get from the DB

    recipe.favouritedBy.push(userId); // modify what I got from the DB

    await recipe.save(); // save to the DB

    return res.send(recipe); // send recipe back to frontend
  } catch (error) {
    res.status(500).json({ error }); // send error if error was caught
  }
};

const unfavourite = async (req, res) => {
  let userId = req?.body?.userId; // get userId from URL
  let recipeId = req.params.recipeId; // get recipeId from URL

  try {
    let recipe = await Recipe.findOne({ _id: recipeId }); // get from the DB
    const index = recipe.favouritedBy.indexOf(userId);

    //
    // favouritedBy = [ 563, 234, 958 ]

    recipe.favouritedBy.splice(index, 1); // remove what I got from the DB
    await recipe.save(); // save to the DB
    return res.send(recipe); // send recipe back to frontend
  } catch (error) {
    res.status(500).json({ error }); // send error if error was caught
  }
};

// const getOnerecipe = (req, res, next) => {
//   recipe
//     .findOne({ _id: req.params.id })
//     .then((recipe) => {
//       res.status(200).json(recipe);
//     })
//     .catch((error) => {
//       res.status(404).json({
//         error: error,
//       });
//     });
// };

// const modifyrecipe = (req, res, next) => {
//   const recipe = new createrecipe({
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
//   recipe.save()
//     .then(() => {
//       res.status(201).json({
//         message: "My One Recipe updated successfully!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };

// const deleteCreaterecipe = (req, res, next) => {
//   recipe.deleteOne({ _id: req.params.id })
//     .then(() => {
//       res.status(200).json({
//         message: "My Own Recipe deleted successfully!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };

// const getAllrecipe = (req, res, next) => {
//   recipe.find()
//     .then((recipe) => {
//       res.status(200).json(recipe);
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };

export default {
  create,
  get,
  favourite,
  unfavourite,
  // getOnerecipe,
  // modifyrecipe,
  // deleterecipe,
  // getAllrecipe,
};

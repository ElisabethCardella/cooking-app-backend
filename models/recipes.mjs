import mongoose from "mongoose";

import uniqueValidator from "mongoose-unique-validator";

const recipeSchema = mongoose.Schema({
  name: { type: String },
  cuisine: { type: String },
  description: { type: String },
  image: { type: String },
  rating: { type: Number },
  time: { type: Number },
  difficulty: { type: String },
  numberOfPerson: { type: Number },
  ingredients: { type: Array },
  steps: { type: Array },
  userId: { type: String },
  favouritedBy: { type: Array }, // a list of ids of users who favourited this recipe
});

// recipeSchema.plugin(uniqueValidator);

export default mongoose.model("recipe", recipeSchema);

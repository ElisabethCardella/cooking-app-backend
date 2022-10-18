const get = (req, res) => {
  res.send([
    "asian",
    "french",
    "asian",
    "british",
    "caribbean",
    "central",
    "europe",
    "chinese",
    "eastern",
    "europe",
    "french",
    "greek",
    "indian",
    "italian",
    "japanese",
    "korean",
    "kosher",
    "mediterranean",
  ]);
};

export default {
  get,
};

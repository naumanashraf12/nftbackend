const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const { data } = await axios.get(
    "https://collections.rarity.tools/upcoming2"
  );
  const newdata = data.map((val) => {
    delete Object.assign(val, { ["imagecount"]: val["Image Count"] })[
      "Image Count"
    ];
    delete Object.assign(val, { ["description"]: val["Short Description"] })[
      "Short Description"
    ];
    delete Object.assign(val, { ["presaleDate"]: val["Listed Date"] })[
      "Listed Date"
    ];
    delete Object.assign(val, { ["saleDate"]: val["Sale Date"] })["Sale Date"];
    delete Object.assign(val, { ["maxItems"]: val["Max Items"] })["Max Items"];

    return val;
  });
  console.log(newdata);
  res.status(200).json({
    newdata,
  });
});
router.get("/heloo", async function (req, res, next) {
  res.status(200).json({
    message: "hellp",
  });
});

module.exports = router;

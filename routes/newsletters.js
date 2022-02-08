const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const data1 = await axios.get("https://versescore.herokuapp.com/upcoming");
  const verse1 = data1.data.data;
  const verse = verse1.map((val) => {
    if (val.image === "") {
      val.image =
        "https://bernardmarr.com/wp-content/uploads/2021/11/What-Are-NFTs-An-Easy-Explanation-For-Anyone.jpg";
    }
    return {
      Project: val?.name,
      mintprice: val?.mintprice,
      website: val?.website,
      discord: val?.discord,
      saleDate: val.release,
      twitter: val?.twitter,
      blockchain: val?.blockchain,
      description: val?.description,
      image: val?.image,
    };
  });

  const { data: data4 } = await axios.get(
    "https://collections.rarity.tools/upcoming2"
  );
  const reality = data4.map((val) => {
    delete Object.assign(val, { ["imagecount"]: val["Image Count"] })[
      "Image Count"
    ];
    delete Object.assign(val, { ["description"]: val["Short Description"] })[
      "Short Description"
    ];
    delete Object.assign(val, { ["presaleDate"]: val["Listed Date"] })[
      "Listed Date"
    ];
    delete Object.assign(val, { ["twitter"]: val["TwitterId"] })["TwitterId"];
    delete Object.assign(val, { ["saleDate"]: val["Sale Date"] })["Sale Date"];
    delete Object.assign(val, { ["discord"]: val["Discord"] })["Discord"];
    delete Object.assign(val, { ["maxItems"]: val["Max Items"] })["Max Items"];
    delete Object.assign(val, { ["website"]: val["Website"] })["Website"];
    delete Object.assign(val, { ["mintprice"]: `${val["Price"]}ETH` })["Price"];
    val.image =
      "https://bernardmarr.com/wp-content/uploads/2021/11/What-Are-NFTs-An-Easy-Explanation-For-Anyone.jpg";

    return val;
  });
  const newdata = [...reality, ...verse];

  res.status(200).json(newdata);
});
router.get("/heloo", async function (req, res, next) {
  res.status(200).json({
    message: "hellp",
  });
});

module.exports = router;

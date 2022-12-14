const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();
var xml2js = require("xml2js");

/* GET home page. */
router.get("/", async function (req, res, next) {

  let tags = req.params.tags;

  let { data } = await axios({
    method: "get",
    url: `https://api.flickr.com/services/feeds/photos_public.gne?tags=${tags}`,
    headers: {
      "Content-Type": "application/xml",
    },
  });

  // convert XML to JSON
  let result = xml2js.parseString(data, { mergeAttrs: true }, (err, result) => {
    if (err) {
      throw err;
    }

    const json = result;

    res.json({ data: json });
  });
});

module.exports = router;

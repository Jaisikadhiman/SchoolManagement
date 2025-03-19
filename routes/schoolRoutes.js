const express = require("express");
const { addSchoolHandler, listSchoolsHandler } = require("../controller/schoolApi");

const router = express.Router();


router.post("/addSchool", addSchoolHandler);

router.get("/listSchools", listSchoolsHandler);

module.exports = router;

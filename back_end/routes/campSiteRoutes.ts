import express from "express";
const router = express.Router();

import multer = require("multer");
import { storage } from "../cloudinary";
import { createCampSite, deleteCampsite, editCampsite, getAllCampSite, getCampSite } from "../controllers/campSites";
import { isAuthor, isLoggedIn } from "../middleware";
const upload = multer({ storage });

router.get("/", getAllCampSite);

router.post("/", isLoggedIn, upload.single("image"), createCampSite);

router.get("/:id", getCampSite)

router.put("/:id", isLoggedIn, isAuthor, upload.single("image"), editCampsite);

router.delete("/:id",isLoggedIn,isAuthor,deleteCampsite)

module.exports = router;

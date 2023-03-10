import express from "express";
const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudinary");
import {
  createCampSite,
  deleteCampsite,
  editCampsite,
  getAllCampSite,
  getCampSite,
} from "../controllers/campSites";
import { isAuthor, isLoggedIn } from "../middleware";

const upload = multer({ storage });

router.get("/", getAllCampSite);

router.post("/", isLoggedIn, upload.single("image"), createCampSite);

router.get("/:id", getCampSite);

router.put("/:id", upload.single("image"), editCampsite);

router.delete("/:id", isLoggedIn, isAuthor, deleteCampsite);

module.exports = router;

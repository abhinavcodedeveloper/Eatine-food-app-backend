import express from "express";
import multer from "multer";
import MyRestaurentController from "../controllers/MyRestaurentController";
import { jwtCheck, jwtprse } from "../middleware/auth";
const router = express.Router();
//
//storage specify krne k lie
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});
router.post(
  "/",
  upload.single("imageFile"),
  jwtCheck,
  jwtprse,
  MyRestaurentController.createRestaurant
);
export default router;

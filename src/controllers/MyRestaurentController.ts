import Restaurent from "../models/restaurent";
import mongoose from "mongoose";
import { Request,Response } from "express";
import  cloudinary from "cloudinary"

const createRestaurant = async (req: Request, res: Response) => {
    try {
      const existingRestaurant = await Restaurent.findOne({ user: req.userId});
        console.log(existingRestaurant)
      if (existingRestaurant) {
        return res
          .status(409)
          .json({ message: "User restaurant already exists" });
      }
      
      //cloudinary code format
      const img = req.file as Express.Multer.File;
      const base64Img = Buffer.from(img.buffer).toString("base64");
      const dataURI = `data:${img.mimetype};base64,${base64Img}`;
      // 
      // console.log(img)
      // console.log(img)
      // console.log(img)
      const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)
      const restaurant = new Restaurent(req.body);
      restaurant.imageUrl = uploadResponse.url;
      restaurant.user = new mongoose.Types.ObjectId(req.userId);
      restaurant.lastUpdated = new Date();
      await restaurant.save();
      res.status(201).send(restaurant);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  export default{
    createRestaurant
  }
  
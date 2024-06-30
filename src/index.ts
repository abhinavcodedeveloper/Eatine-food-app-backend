// initialise express and handle the api , starting server
import  express,{ Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoute"
import myRestaurentRoute from "./routes/myRestaurentRoute"
import {v2 as cloudinary} from "cloudinary"
// CONNECT TO DB
mongoose
  .connect(process.env.MONGODB_CONNECTION_KEY as string)
  .then(() => console.log("Connected To MongoDB"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoute)
app.use("/api/my/restaurent", myRestaurentRoute)
// app.get("/testing", async (req: Request, res: Response) => {
//   res.json({ message: "hi" });
// });

app.get("/food",async(req:Request,res:Response)=>{
  res.send({
    message:"food is ok"
  })
})

app.listen(3000, () => {
  console.log("Server Started at host:", 3000);
});

import { Request,Response } from "express";
import Restaurent from "../models/restaurent";
 
const searchRest = async (req:Request,res:Response)=>{
    try{
        const city = req.params.city
        const searchq = (req.query.searchq as string)||"";
        const selectedCuisines = (req.query.selectedCuisines as string)||"";
        const sort = (req.query.sort as string)||"lastUpdated";
        const page = parseInt(req.query.page as string) || 1;

    }catch(E){  
        console.log(E);
    }
}
const searchRestaurant = async (req: Request, res: Response) => {
    try {
      const city = req.params.city;
  
      const searchQuery = (req.query.searchQuery as string) || "";
      const selectedCuisines = (req.query.selectedCuisines as string) || "";
      const sortOption = (req.query.sortOption as string) || "lastUpdated";
      const page = parseInt(req.query.page as string) || 1;
  
      let query: any = {};
  
      query["city"] = new RegExp(city, "i");
      const cityCheck = await Restaurent.countDocuments(query);
      if (cityCheck === 0) {
        return res.status(404).json({
          data: [],
          pagination: {
            total: 0,
            page: 1,
            pages: 1,
          },
        });
      }
//   cuisines selec krrhe 
      if (selectedCuisines) {
        const cuisinesArray = selectedCuisines
          .split(",")
          .map((cuisine) => new RegExp(cuisine, "i"));
  
        query["cuisines"] = { $all: cuisinesArray };
      }
  
      if (searchQuery) {
        const searchRegex = new RegExp(searchQuery, "i");
        query["$or"] = [
          { restaurantName: searchRegex },
          { cuisines: { $in: [searchRegex] } },
        ];
      }
  
      const pageSize = 10;
      const skip = (page - 1) * pageSize;
  
      // sortOption = "lastUpdated"
      const restaurants = await Restaurent.find(query)
        .sort({ [sortOption]: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean();
  
      const total = await Restaurent.countDocuments(query);
  
      const response = {
        data: restaurants,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      };
  
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
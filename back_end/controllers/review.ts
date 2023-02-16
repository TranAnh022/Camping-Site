import { Review } from "../models/review";
import { CampSite } from "../models/campingSite";
import { Request, Response } from "express";
import { UserType } from "../models/user";

export const createReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campsite = await CampSite.findById(id);
    const review = new Review(req.body.review);
    const userTypeWithId = req.user as UserType & { _id: string };
    review.author = userTypeWithId?._id;
    campsite.reviews.push(review);
    await review.save();
    await campsite.save();
    res.status(200).json({
      message: "Congratulations on successfully creating a new review!!!",
    });
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id, reviewId } = req.params;
    await CampSite.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    }); //we using pull method from mongoose to remove(take of) the review from campground but the review still exist in the database
    await Review.findByIdAndDelete(reviewId); // this method will delete the review that the campground remove above
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

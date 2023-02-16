import { CampSite } from "../models/campingSite";
import { Request, Response, NextFunction } from "express";
import { UserType } from "../models/user";

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    (req.session as any).returnTo = req.originalUrl;
    res.status(500).json("error with authentication");
  }
  next();
};

const isAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const campsite = await CampSite.findById(id);
    const userTypeWithId = req.user as UserType & { _id: string };
    if (campsite.author.equals(userTypeWithId?._id)) {
      next();
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }

  next();
};

export { isAuthor, isLoggedIn };


import { Request, Response, NextFunction } from "express";
const User = require("../models/user");
//--Create User--

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password); //using the register method from password middleware
    req.login(registerUser, (err) => {
      if (err) return next(err);
      res.status(200).json("success ,Welcome to Yelp Camp!");
    });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

//--login--
export const login = async (req: Request, res: Response) => {
  const redirectUrl = (req.session as any).returnTo || "/campsites";
  res.send(200).json("success, Welcome back!");
  delete (req.session as any).returnTo; // keep no remants(the url) in the session
  res.redirect(redirectUrl);
};

//--logout--
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/camgsites");
  });
};

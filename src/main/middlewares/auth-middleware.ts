import jwtHandler from "@infra/authentication/jwt-handler";
import userRepository from "@infra/persistence/repositories/user-repository";
import { NextFunction, Request, Response } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ");

  if (!token || token.length !== 2 || token[0] !== "Bearer") {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = await jwtHandler.verify(token[1]);

    if (typeof decoded === "undefined") {
      return res.status(401).json({ message: "Invalid token." });
    }

    const { id, email } = decoded;

    const user = await userRepository.get(email);

    if (!user || user.id !== id) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    req.headers.userId = id;
    req.headers.userEmail = email;

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Invalid token.", error: err.message });
  }
};

export default authMiddleware;

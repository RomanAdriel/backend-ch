import express  from 'express';
const uploadRouter = express.Router();
import upload from "../../middlewares/uploadFile.js";


uploadRouter.post("/", upload.single("myFile"), (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error("File not found");
      return next(error);
    }
    res.status(200).send(file);
});

export default uploadRouter;
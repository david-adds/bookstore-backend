import NotFound from "../errors/notFoundError.js";
import { author } from "../models/Author.js";

class AuthorController {
  static async listAuthors ( req, res, next) {
    try{
      const list_authors = await author.find({});
      res.status(200).json(list_authors);
    } catch (error) {
      next(error);
    }
  }

  static async listAuthorById ( req, res, next) {
    try{
      const  id = req.params.id;
      const authorFound = await author.findById(id);
      if (authorFound !== null) {
        res.status(200).json(authorFound);
      } else {
        next(new NotFound("Author Id not found."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateAuthor ( req, res, next) {
    try{
      const  id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Author Successfully Updated" });
    } catch (error) {
      next(error);
    }
  }

  static async registerAuthor ( req, res, next) {
    try{
      const newAuthor = await author.create(req.body);
      res.status(201).json({ message: "Author Successfuly Registered", author: newAuthor });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthor ( req, res, next) {
    try{
      const  id = req.params.id;
      await author.findByIdAndDelete(id, req.body);
      res.status(200).json({ message: "Author Successfully Deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthorController;

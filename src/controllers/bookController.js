import { book } from "../models/index.js";
import { author } from "../models/index.js";
import NotFound from "../errors/notFoundError.js";

class BookController {
  static async listBooks ( req, res, next) {
    try{
      const list_books = await book.find({});
      res.status(200).json(list_books);
    } catch (error) {
      next(error);
    }
  }

  static async listBookById ( req, res, next) {
    try{
      const  id = req.params.id;
      const bookFound = await book.findById(id);
      
      if (bookFound !== null) {
        res.status(200).json(bookFound);
      } else {
        next(new NotFound("Book Id not located."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateBook ( req, res, next) {
    try{
      const  id = req.params.id;
      const bookResult = await book.findByIdAndUpdate(id, req.body);

      if (bookResult !== null) {
        res.status(200).json({ message: "Book Successfully Updated" });
      } else {
        next(new NotFound("Book Id not located."));
      }
      
    } catch (error) {
      next(error);
    }
  }

  static async registerBook ( req, res, next ) {
    const newBook = req.body;
    try{
      const authorFound = await author.findById(newBook.author);
      const fullBook = {... newBook, author: {... authorFound._doc
      }};
      const createdBook = await book.create(fullBook);
      res.status(201).json({ message: "Book Successfuly Registered", book: createdBook });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook ( req, res, next) {
    try{
      const  id = req.params.id;
      const bookResult = await book.findByIdAndDelete(id, req.body);

      if (bookResult !== null) {
        res.status(200).json({ message: "Book Successfully Deleted" });
      } else {
        next(new NotFound("Book Id not located."));
      }

    } catch (error) {
      next(error);
    }
  }

  static async listBooksByFilter(req, res, next) {
    
    try {
      const { publisher, title } = req.query;

      const regex = new RegExp(publisher, "i");

      const search = {};
      
      if (publisher) search.publisher = regex;
      if (title) search.title = { $regex: title,  $options: "i"};

      const bookByPublisher = await book.find(search);
      res.status(200).json(bookByPublisher);

    } catch (error) {
      next(error);
    }

  }
}

export default BookController;

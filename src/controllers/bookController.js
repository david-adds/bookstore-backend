import book from "../models/Book.js";
import { author } from "../models/Author.js";

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
      res.status(200).json(bookFound);
    } catch (error) {
      next(error);
    }
  }

  static async updateBook ( req, res, next) {
    try{
      const  id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Book Successfully Updated" });
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
      await book.findByIdAndDelete(id, req.body);
      res.status(200).json({ message: "Book Successfully Deleted" });
    } catch (error) {
      next(error);
    }
  }
  static async listBooksByPublisher(req, res, next) {
    const publisher = req.query.publisher;
    try {
      const bookByPublisher = await book.find({publisher: publisher});
      res.status(200).json(bookByPublisher);
    } catch (error) {
      next(error);
    }

  }
}

export default BookController;

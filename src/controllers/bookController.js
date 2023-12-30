import book from "../models/Book.js";
import { author } from "../models/Author.js";

class BookController {
    static async listBooks ( req, res) {
        try{
            const list_books = await book.find({});
            res.status(200).json(list_books);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Request Failure`});
        }
    };

    static async listBookById ( req, res) {
        try{
            const  id = req.params.id;
            const bookFound = await book.findById(id);
            res.status(200).json(bookFound);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to Request Book`});
        }
    };

    static async updateBook ( req, res) {
        try{
            const  id = req.params.id;
            await book.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Book Successfully Updated" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to Update Book info`});
        }
    };

    static async registerBook ( req, res ) {
        const newBook = req.body;
        try{
            const authorFound = await author.findById(newBook.author);
            const fullBook = {... newBook, author: {... authorFound._doc
            }};
            const createdBook = await book.create(fullBook);
            res.status(201).json({ message: "Book Successfuly Registered", book: newBook });
        } catch (error) {
            res.status(500).json({message: `${error.message} - Failed to Register New Book!`});
        }
    }

    static async deleteBook ( req, res) {
        try{
            const  id = req.params.id;
            await book.findByIdAndDelete(id, req.body);
            res.status(200).json({ message: "Book Successfully Deleted" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to Delete Book info`});
        }
    };
    static async listBooksByPublisher(req, res) {
        const publisher = req.query.publisher;
        try {
            const bookByPublisher = await book.find({publisher: publisher});
            res.status(200).json(bookByPublisher);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed Search`});
        }

    }
};

export default BookController;

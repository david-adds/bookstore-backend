import { author } from "../models/Author.js";

class AuthorController {
    static async listAuthors ( req, res) {
        try{
            const list_authors = await author.find({});
            res.status(200).json(list_authors);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Request Failure`});
        }
    };

    static async listAuthorById ( req, res) {
        try{
            const  id = req.params.id;
            const authorFound = await author.findById(id);
            res.status(200).json(authorFound);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to Request Author`});
        }
    };

    static async updateAuthor ( req, res) {
        try{
            const  id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Author Successfully Updated" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to Update Authot Info`});
        }
    };

    static async registerAuthor ( req, res ) {
        try{
            const newAuthor = await author.create(req.body);
            res.status(201).json({ message: "Author Successfuly Registered", author: newAuthor });
        } catch (error) {
            res.status(500).json({message: `${error.message} - Failed to Register New Author!`});
        }
    }

    static async deleteAuthor ( req, res) {
        try{
            const  id = req.params.id;
            await author.findByIdAndDelete(id, req.body);
            res.status(200).json({ message: "Author Successfully Deleted" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to Delete Author info`});
        }
    };
};

export default AuthorController;

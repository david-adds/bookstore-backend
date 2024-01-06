import IncorrectRequest from "../errors/incorrectRequest.js";

async function paginate(req, res, next) {
    try {
        let {limit=5, page_=1, sort = "_id:-1"} = req.query;

        let [sortingField, order]= sort.split(":");

        limit = parseInt(limit);
        page_ = parseInt(page_);
        order = parseInt(order);

        const result = req.result;

        if (limit > 0 && page_ >0 ){
            const paginatedResult = await result.find()
            .sort({[sortingField]: order})
            .skip((page_-1)*limit)
            .limit(limit);

            res.status(200).json(paginatedResult);
        } else {
            next(new IncorrectRequest());
        }
    } catch (error) {
        next(error);
    }
}

export default paginate;

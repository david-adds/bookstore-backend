import NotFound from "../errors/notFoundError.js";

function notFoundHandler(req, res, next) {
  const error404 = new NotFound();
  next(error404);
}

export default notFoundHandler;
const validMiddleWare = (schema, property) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(
        res.status(400).json({
          result: "false",
          error: "fields can't be empty",
        })
      );
    }
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      res.status(422).json({ error: message });
    }
  };
};
module.exports = validMiddleWare;

import Joi from "joi";
import { Response, Request, NextFunction } from "express";

const schema = Joi.object({
  email: Joi.string().required().email().message("email tidak sesuai"),
  repeat_password: Joi.valid(Joi.ref("password")).message(
    "password harus sama"
  ),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(/(?=(?:.*[a-z]){1,16}).+/, "lowercase")
    .pattern(/(?=(?:.*[A-Z]){1,16}).+/, "uppercase")
    .pattern(/(?=(?:.*[0-9]){1,16}).+/, "number")
    .pattern(/(?=(?:.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]){1,16}).+/, "special")
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.base":
          case "string.empty":
          case "any.required":
          default:
            err.message = "error ";
            break;
          case "string.min":
            err.message = "password kurang dari 8";
            break;
          case "string.max":
            err.message = "password max 16";
            break;
          case "string.pattern.name":
            switch (err.local.name) {
              case "lowercase":
                err.message = "password harus terdapat 1 lowercase";
                break;
              case "uppercase":
                err.message = "password harus terdapat 1 uppercase ";
                break;
              case "number":
                err.message = "password wajib ada number 1";
                break;
              case "special":
                err.message = "password wajib terdapat special karakter";
                break;
            }
            break;
        }
      });

      return errors;
    }),
  username: Joi.string()
    .required()
    .min(3)
    .max(16)
    .message("require minimal 3 characther"),
});

export const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;
    await schema.validateAsync({
      email,
      password,
      username,
      //   repeat_password,
    });
    next();
  } catch (error) {
    next(error);
  }
};

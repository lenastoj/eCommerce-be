import User from "@models/user.model";

export const sanitizeUser = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

export const sanitizeError = (
  error: Error,
  value: string,
  location = 'body'
) => {
  return {
    success: false,
    errors: [
      {
        msg: error.message,
        location,
        value,
      },
    ],
  };
};
import mongoose from 'mongoose';

const validateEmail = (email:any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateObjectId = (string:string) => {
  return mongoose.Types.ObjectId.isValid(string);
}

exports = {
  validateEmail,
  validateObjectId,
}
const HttpErrors = require("../data/httpErrors.js"); // assuming your enum file is named HttpStatusEnum.js
const encryptData = require("../utils/encryption.js");
const { ErrorHandler } = require("../utils/errorHandler.js");
const generateRandomNumber = require("../utils/randomNumber.js");

function errorHandlerMiddleware(error, req, res, next) {
  console.log(error);
  console.log("name --- ", error.name);

  let defaultError = {
    code: 500,
    message: "Something went wrong",
  };

  if (error.name === "Error") {
    defaultError = {
      code: 409,
      message: "Conflict",
    };
    let encrpted = encryptData({
      success: false,
      data: null,
      isError: true,
      error: defaultError,
      errMsg: error.message,
    });

    const responseObject = {
      encoded: encrpted,
      jrn: generateRandomNumber(),
    };

    return res.status(defaultError.code).json(responseObject);
  }

  if (error instanceof ErrorHandler) {
    let encrpted;
    if (HttpErrors[error.statusCode]) {
      encrpted = encryptData({
        success: false,
        data: null,
        isError: true,
        error: HttpErrors[error.statusCode],
        errMsg: error.message,
      });
    } else {
      encrpted = encryptData({
        success: false,
        data: null,
        isError: true,
        error: defaultError,
        errMsg: error.message,
      });
    }

    const responseObject = {
      encoded: encrpted,
      jrn: generateRandomNumber(),
    };

    return res
      .status(
        HttpErrors[error.statusCode] ? error.statusCode : defaultError.code
      )
      .json(responseObject);
  }

  let encrpted = encryptData({
    success: false,
    data: null,
    isError: true,
    error: defaultError,
    errMsg: error.message,
  });

  const responseObject = {
    encoded: encrpted,
    jrn: generateRandomNumber(),
  };

  return res.status(500).json(responseObject);
}

module.exports = {
  errorHandlerMiddleware,
};

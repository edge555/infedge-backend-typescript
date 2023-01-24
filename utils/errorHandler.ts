export {};
const AppError = require('../utils/appError');

const handleSequelizeUniqueConstraintError = (message: any) => new AppError(message, 401);
const handleSequelizeValidationError = (message: any) => new AppError(message, 401);
const handleSequelizeDatabaseError = (message: string) => new AppError(message, 401);

const sendError = (err: { isOperational: any; statusCode: any; status: any; message: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: any; message: any; }): void; new(): any; }; }; }) => {
  console.log(err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};
module.exports = (err: { statusCode: number; status: string; name: string; errors: { message: any; }[]; }, req: any, res: any, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (err.name === 'SequelizeUniqueConstraintError') err = handleSequelizeUniqueConstraintError(err.errors[0].message);
  if (err.name === 'SequelizeValidationError') err = handleSequelizeValidationError(err.errors[0].message);
  if (err.name === 'SequelizeDatabaseError') err = handleSequelizeDatabaseError('Database Error');

  sendError(err, res);
};

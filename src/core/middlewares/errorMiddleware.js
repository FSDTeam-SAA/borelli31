const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Prefer explicit statusCode on errors thrown by services/controllers
    let status = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle common Mongoose errors
    if (err.name === 'ValidationError') {
        status = 400;
        message = 'Validation failed';
    }
    if (err.code === 11000) { // duplicate key
        status = 409;
        message = 'Duplicate key error';
    }

    // JWT/auth errors if any middleware throws them
    if (err.name === 'JsonWebTokenError') {
        status = 401;
        message = 'Invalid token';
    }
    if (err.name === 'TokenExpiredError') {
        status = 401;
        message = 'Token expired';
    }

    return res.status(status).json({ 
        status: false,
        message,
        error: err.message
    });
};

export default errorHandler;


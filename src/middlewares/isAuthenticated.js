import jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export const isAuthenticated = (req, res, next) => {
  const { headers } = req;

  const authHeader = headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      data: null,
      message: 'El header Authorization no esta presente en la peticion',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    req.user = payload;

    next();
  } catch (e) {
    res.status(401).json({
      data: null,
      message: 'Token invalido o expirado',
    });
  }
};

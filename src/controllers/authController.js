import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../models/userSchema.js';

const { JWT_SECRET_KEY } = process.env;

export const postLogin = async (req, res) => {
  const { body: { username, password } } = req;
  try {
    const userInDB = await UserModel.findOne({ username, isActive: true });

    if (!userInDB || !bcrypt.compareSync(password, userInDB.password)) {
      res.status(400).json({
        data: null,
        message: 'Usuario o contraseña incorrecta',
      });
      return;
    }

    const userInfo = {
      ...userInDB._doc,
      password: undefined,
      isActive: undefined,
    };

    const token = jwt.sign(userInfo, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({
      data: token,
      message: 'Usuario loggeado exitosamente',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error en el inicio de sesion',
    });
  }
};

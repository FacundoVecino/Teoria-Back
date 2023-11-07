import bcrypt from 'bcryptjs';
import UserModel from '../models/userSchema.js';

export const getUsers = async (_, res) => {
  try {
    const data = await UserModel.find({});
    const filterData = data
      .filter((user) => user._doc.isActive === true)
      .map((user) => ({
        ...user._doc,
        password: undefined,
      }));
    res.json({ data: filterData, message: 'Usuarios encontrados' });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error',
    });
  }
};

export const postUser = async (req, res) => {
  const { body } = req;
  const hashedPassword = bcrypt.hashSync(body.password, 10);
  const newUser = new UserModel({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    password: hashedPassword,
    isActive: true,
    isAdmin: false,
  });

  try {
    await newUser.save();
    res.status(201).json({
      data: null,
      message: 'Usuario creado exitosamente',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'El nombre de usuario ya está en uso',
      });
    } else {
      res.status(500).json({
        data: null,
        message: 'Ocurrió un error guardando el usuario',
        error: e.message,
      });
    }
  }
};

export const putUser = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    // updateOnde Metodo actualiza un elemento
    // Necesita por parametros el id para buscar el usuario que coincida
    // Y el body para indicar que actualice lo que recibe por ahi
    const action = await UserModel.updateOne({ _id: id }, body);

    // matchedCount es un campo que verifica cuantos elementos fueron modificados
    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No se encontró un usuario con ese id',
      });
      return;
    }
    res.json({
      data: null,
      message: 'El usuario ha sido actualizado exitosamente',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'El nombre de usuario ya está en uso',
      });
    } else {
      res.status(500).json({
        data: null,
        message: 'Ocurrió un error actualizando el usuario',
        error: e.message,
      });
    }
  }
};

export const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    // updateOnde Metodo actualiza un elemento
    // Necesita por parametros el id para buscar el usuario que coincida
    // Y el body para indicar que actualice lo que recibe por ahi
    const action = await UserModel.updateOne({ _id: id, isActive: true }, { isActive: false });

    // matchedCount es un campo que verifica cuantos elementos fueron modificados
    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No se encontró un usuario con ese id',
      });
      return;
    }
    res.json({
      data: null,
      message: 'El usuario ha sido eliminado exitosamente',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error eliminando el usuario',
      error: e.message,
    });
  }
};

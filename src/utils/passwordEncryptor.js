import bcrypt from 'bcrypt';

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // Encriptación de la contraseña
};

export const validatePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash); // Comparación de la contraseña con el hash
};
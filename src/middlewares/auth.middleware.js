export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // Si el usuario está autenticado, continuar
  } 
  return res.status(401).json({ status: 'error', message: 'No autorizado' });
};
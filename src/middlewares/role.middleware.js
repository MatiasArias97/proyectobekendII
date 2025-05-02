export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Acceso denegado: rol no autorizado'
      });
    }

    next();
  };
}
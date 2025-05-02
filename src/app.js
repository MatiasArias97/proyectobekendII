import express from 'express';
import sessionRouter from './routes/sessions.router.js';  // Rutas para sesiones
import cartRouter from './routes/carts.router.js';        // Rutas para carritos
import productRouter from './routes/products.router.js';  // Rutas para productos
import errorHandler from './middlewares/errorHandler.js';       // Middleware para manejo de errores
import passport from 'passport';                          // Importa passport
import './config/passport.js';                            // Ejecuta la configuración de estrategias
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Carga las variables de entorno desde .env

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());  // Inicializa Passport

// Rutas
app.use('/api/sessions', sessionRouter);
app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);

// Middleware de manejo de errores
app.use(errorHandler);

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  connectDB();
});

export default app;
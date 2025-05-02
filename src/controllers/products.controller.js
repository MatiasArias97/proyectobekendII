import productRepository from '../repositories/products.repository.js';

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await productRepository.getAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await productRepository.getById(req.params.pid);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    // Desestructurar los campos necesarios
    const { title, description, price, category, stock, thumbnails, status, code } = req.body;

    // Verificar si el código es único
    const existingProduct = await productRepository.getByCode(code);
    if (existingProduct) {
      return res.status(400).json({ message: 'El código del producto ya existe' });
    }

    // Crear el nuevo producto
    const newProduct = await productRepository.create({
      title,
      description,
      price,
      category,
      stock,
      thumbnails,
      status,
      code
    });

    res.status(201).json({ message: 'Producto creado correctamente', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const { title, description, price, stock } = req.body;

    const updatedProduct = await productRepository.update(pid, { title, description, price, stock });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto actualizado correctamente', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const deletedProduct = await productRepository.delete(pid);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET All Products
exports.getAllProducts = async (req, res) => {
  try {
    const host = req.protocol + "://" + req.get("host");

    const products = await prisma.products.findMany({
      include: {
        reviews: true,
      },
    });

    const productsWithFullPath = products.map((product) => ({
      ...product,
      gambar: product.gambar ? `${host}/uploads/${product.gambar}` : null,
    }));

    res.status(200).json({
      code: 200,
      message: "Success",
      data: productsWithFullPath,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// GET Product By ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.products.findUnique({
      where: { id: parseInt(id) },
      include: {
        reviews: true,
      },
    });

    if (!product) {
      return res.status(404).json({ code: 404, message: "Product Not Found" });
    }

    const host = req.protocol + "://" + req.get("host");

    const productWithFullPath = {
      ...product,
      gambar: product.gambar ? `${host}/uploads/${product.gambar}` : null,
    };

    res.status(200).json({
      code: 200,
      message: "Success",
      data: productWithFullPath,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// create product
exports.createProduct = async (req, res) => {
  const { nama_produk, deskripsi, harga, Stok } = req.body;
  const gambar = req.file?.filename || null;

  try {
    const newProduct = await prisma.products.create({
      data: {
        nama_produk,
        deskripsi,
        gambar,
        harga: parseInt(harga),
        Stok: parseInt(Stok),
      },
    });

    const host = req.protocol + "://" + req.get("host");
    const newProductWithFullPath = {
      ...newProduct,
      gambar: gambar ? `${host}/uploads/${gambar}` : null,
    };

    res.status(201).json({
      code: 201,
      message: "Success",
      data: newProductWithFullPath,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// edit produk
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nama_produk, deskripsi, harga, Stok } = req.body;

  // Ambil gambar baru dari file upload (kalau ada)
  const gambarBaru = req.file?.filename;

  // Siapkan objek data yang akan diupdate
  const data = {};

  if (nama_produk !== undefined) data.nama_produk = nama_produk;
  if (deskripsi !== undefined) data.deskripsi = deskripsi;
  if (harga !== undefined) data.harga = parseInt(harga);
  if (Stok !== undefined) data.Stok = parseInt(Stok);
  if (gambarBaru !== undefined) data.gambar = gambarBaru;

  try {
    // Ambil dulu product-nya untuk validasi / logika tambahan
    const existingProduct = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ code: 404, message: "Product Not Found" });
    }

    const updatedProduct = await prisma.products.update({
      where: { id: parseInt(id) },
      data,
    });

    // Bangun path lengkap ke gambar
    const host = req.protocol + "://" + req.get("host");
    const gambarFinal = updatedProduct.gambar
      ? `${host}/uploads/${updatedProduct.gambar}`
      : null;

    res.status(200).json({
      code: 200,
      message: "Success",
      data: {
        ...updatedProduct,
        gambar: gambarFinal,
      },
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.products.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      code: 200,
      message: "Product Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get All Reviews
exports.getAllReviews = async (req, res) => {
  try {
    const review = await prisma.reviews.findMany({
      include: {
        product: true,
      },
    });
    res.status(200).json({
      code: 200,
      message: "Success fecth all reviews",
      data: review,
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, message: "Internal Server Error", err: err.message });
  }
};

// Get Review By Id
exports.getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await prisma.reviews.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        product: true,
      },
    });
    if (!review) {
      return res.status(404).json({
        code: 404,
        message: "Review not found",
      });
    }
    res.status(200).json({
      code: 200,
      message: "Success fecth review",
      data: review,
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, message: "Internal Server Error", err: err.message });
  }
};

// Create Review
exports.createReview = async (req, res) => {
  const { review, productId } = req.body;
  const user_token = req.cookies.user_token;
  try {
    // cek apakah user sudah pernah review
    const existing = await prisma.reviews.findFirst({
      where: {
        user_token,
        productId,
      },
    });
    if (existing) {
      return res.status(400).json({
        code: 400,
        message: "Kamu sudah mereview produk ini.",
      });
    }
    const newReview = await prisma.reviews.create({
      data: {
        review,
        user_token,
        product: { connect: { id: productId } },
      },
      include: {
        product: true,
      },
    });
    res.status(201).json({
      code: 201,
      message: "Success create review",
      data: newReview,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      err: err.message,
    });
  }
};

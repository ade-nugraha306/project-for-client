const crypto = require('crypto');

const authCookies = (req, res, next) => {
  // Jika belum ada cookie user_token, maka generate dan set
  if (!req.cookies.user_token) {
    const token = crypto.randomBytes(16).toString("hex");
    res.cookie("user_token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 hari
    });
    req.cookies.user_token = token; // inject supaya bisa langsung dipakai
  }

  next();
};

module.exports = authCookies;
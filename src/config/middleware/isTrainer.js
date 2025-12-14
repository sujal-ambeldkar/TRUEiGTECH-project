module.exports = (req, res, next) => {
  if (req.user.role !== "trainer") {
    return res.status(403).json({ msg: "Access denied. Trainers only." });
  }
  next();
};

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:3000", // Замените на URL вашего фронтенда
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());

const dbUrl = process.env.MONGO_URL;
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  photo: {
    data: Buffer,
    contentType: String,
  },
});

const User = mongoose.model("User", userSchema);

// Register endpoint
app.post(
  "/api/register",
  upload.single("photo"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors });
      }
      const { name, email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const photo = req.file ? req.file.path : null;
      const user = new User({
        name,
        email,
        password: hashedPassword,
        photo: req.file
          ? { data: req.file.buffer, contentType: req.file.mimetype }
          : null,
      });
      await user.save();
      res.status(201).send("User registered");
    } catch (err) {
      res.status(400).send("Error registering user");
    }
  }
);

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send("Invalid password");

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access Denied");

  const bearerToken = token.split(" ")[1];
  console.log("Bearer token:", bearerToken);

  jwt.verify(bearerToken, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid Token");

    req.user = user;
    next();
  });
};

// Profile endpoint
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).send("User not found");

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo
        ? `data:${user.photo.contentType};base64,${user.photo.data.toString(
            "base64"
          )}`
        : null,
    };

    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

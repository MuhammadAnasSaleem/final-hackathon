import express from "express";
import "dotenv/config";
import "./database.js"; // Assuming you have a separate file to connect to MongoDB
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import { User } from "./models/user.js";
import { Loan } from "./models/loan.js"; // Import the Loan model

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: true, // Allows all origins
    credentials: true,
  })
);

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Validation Schema for Signup
const signupSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  cninc: Joi.string().required(),
});

// Middleware to Authenticate Token
const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.myToken;

    if (!token) {
      return res.status(401).send({ message: "Token is missing" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Token is invalid or has expired" });
      }
      req.user = user; // Attach user info to the request object
      next();
    });
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .send({ message: "Authentication error", error: error.message });
  }
};

// Signup Route
app.post("/api/v1/signup", async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const existingUserByCNIC = await User.findOne({ cninc: req.body.cninc });
  if (existingUserByCNIC) {
    return res.status(400).send({ message: "CNIC already exists" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send({ message: "Account already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      cninc: req.body.cninc,
    });
    const { password, __v, ...userWithoutPassword } = newUser.toObject();
    res
      .status(201)
      .send({ message: "Signup successful", data: userWithoutPassword });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating user", error: error.message });
  }
});

// Login Route
app.post("/api/v1/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || user.cninc !== req.body.cninc) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .cookie("myToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "Lax",
    })
    .status(200)
    .send({ message: "Login successful", token });
});

// Logout Route
app.post("/api/v1/logout", (req, res) => {
  res.clearCookie("myToken", {
    httpOnly: true,
    sameSite: "Strict",
  });
  res.status(200).send({ message: "Logged out successfully" });
});

// Protected Route
app.get("/api/v1/protected", authenticateToken, (req, res) => {
  res.send({ message: "This is a protected route", user: req.user });
});

// Loan Submission Route
app.post("/api/v1/loans", authenticateToken, async (req, res) => {
  const { category, subcategory, amount, period } = req.body;

  if (!category || !subcategory || !amount || !period) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const newLoan = new Loan({
      user: req.user.id,
      category,
      subcategory,
      amount,
      period,
    });

    const savedLoan = await newLoan.save();
    res.status(201).send({
      message: "Loan application submitted successfully",
      loan: savedLoan,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error submitting loan application",
      error: error.message,
    });
  }
});

// Admin - View All Loans
app.get("/api/v1/admin/loans", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Access denied" });
  }

  try {
    const loans = await Loan.find().populate("user", "name email cninc");
    res.status(200).send({ loans });
  } catch (error) {
    res.status(500).send({
      message: "Error fetching loans",
      error: error.message,
    });
  }
});

// Admin - Update Loan Status
app.put("/api/v1/admin/loans/:loanId", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Access denied" });
  }

  const { status } = req.body;
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).send({ message: "Invalid status" });
  }

  try {
    const updatedLoan = await Loan.findByIdAndUpdate(
      req.params.loanId,
      { status },
      { new: true }
    );
    res.status(200).send({ message: "Loan status updated", loan: updatedLoan });
  } catch (error) {
    res.status(500).send({
      message: "Error updating loan status",
      error: error.message,
    });
  }
});
app.get("/", (req, res) => {
  res.status(200).send({ message: "api is working flawlessly" });
});
// Fallback Route for 404
app.use((req, res) => {
  res.status(404).send({ message: "Route not found!" });
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

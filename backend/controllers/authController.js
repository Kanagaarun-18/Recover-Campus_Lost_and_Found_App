// controllers/authController.js
import jwt from "jsonwebtoken";
import supabase from "../config/supabaseClient.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(201).json({
      message: "User registered successfully",
      user: data.user
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    const token = jwt.sign(
      {
        id: data.user.id,
        email: data.user.email,
        role: data.user.user_metadata?.role || "user"
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

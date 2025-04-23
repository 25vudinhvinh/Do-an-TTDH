const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
        return res.status(400).json({ error: "Ô này không dược để trống." });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Mật khẩu không khớp." });
    }
    try {
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: "Tài khoản đã tồn tại." });
        }
        const user = await User.create(username, password);
        res.status(201).json({
            message: "Đăng ký tài khoản thành công,",
            user_id: user.user_id,
        });
    } catch (error) {
        console.error("Đăng ký tài khoản thất bại.", error);
        res.status(500).json({
            error: "Đăng ký tài khoản thất bại.",
            details: error.message,
        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Ô này không được để trống" });
    }
    try {
        const user = await User.findByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res
                .status(401)
                .json({ error: "Sai tài khoản hoặc mật khẩu." });
        }
        const token = jwt.sign(
            { user_id: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ message: "Đăng nhập thành công", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            error: "Đăng nhập thất bại",
            details: error.message,
        });
    }
};

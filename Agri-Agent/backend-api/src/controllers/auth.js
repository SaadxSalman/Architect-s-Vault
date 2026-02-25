const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    // 1. Find user in MongoDB (Simplified example)
    // const user = await User.findOne({ email });
    
    // 2. Check Password and issue JWT
    const token = jwt.sign(
        { userId: "farm_manager_1", role: "admin" }, 
        process.env.JWT_SECRET, 
        { expiresIn: '8h' }
    );

    res.json({ id: "1", name: "Saad", email: "saad@example.com", accessToken: token });
};
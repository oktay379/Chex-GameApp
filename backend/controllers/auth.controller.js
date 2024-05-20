import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "No Token" });
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.json("Wrong Token")
            } else {
                req.userData = decoded; 
                next();
            }
        })
    }
}
export const verify = async (req, res) => {
    return res.json(req.userData);
}


export const signup = async (req, res) => {
	try {
		const count = await User.countDocuments();
        const firstAcc = count === 0;

		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		let newUser;
        if(firstAcc) {
            newUser = await User.create({
				fullName,
				username,
				password: hashedPassword,
				gender,
				profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
				role: "admin"
			});
        }
        else {
            newUser = await User.create({
				fullName,
				username,
				password: hashedPassword,
				gender,
				profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
				role: "user"
			});
        }

		res.status(201).json({
            status: true,
            newUser
        });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};



export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if(!user) {
            return res.status(500).json({error: "Invalid Username"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);


		if (!user || !passwordCompare) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		const token = jwt.sign(
            {
				email: user.email, 
				fullName: user.fullName, 
				id: user._id, 
				profilePic: user.profilePic, 
				role: user.role
			}, 
            process.env.JWT_SECRET, 
            {expiresIn: "15d"}
        );
        res.cookie("token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            secure: true
        })

        res.status(201).json({
            status: true,
            message: "Success",
            token
        });
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const logout = async (req, res) => {
    res.clearCookie("token");
    return res.json("Success");
}
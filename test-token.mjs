import jwt from 'jsonwebtoken';


const JWT_SECRET = "SkillAna888";
const payload = {
    id : "69d79d22ce57ad582bf414de"
}

const token = jwt.sign(payload,  JWT_SECRET, { expiresIn : "10h" });

console.log("Generated Token:", token);
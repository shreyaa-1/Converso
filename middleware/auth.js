const jwt = require("jsonwebtoken");
const { MailSender } = require("../utility/nodemailer");
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send("Not authorized");
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.params.id === req.user.id) {
      next();
    } else {
      return res.status(403).send("Not authorized");
    }
  });
};

const sendotp = async (req,res,next) => {
  try {
    const email=req.body.email;
    // console.log(email);
    // console.log(user);
    if (email) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      // console.log(otp);
      let myObj = {
        email: email,
      otp:otp,
      };
      MailSender("signupVerify", myObj);

      return res.json({
        successMessage: "success",
        email: email,
        otp:otp
      });
    } else {
      // return res.send(null);
      return res.json({
        errorMessage: "Email not found",
      });
    }
  } catch (err) {
    if (err) console.log(err.message);
    return res.json({
      errorMessage: err.message,
    });
  }
};
const verifyotp= async(req,res,next)=>{
  const otp=req.body.otpd;
  // console.log(otp);
  const userotp=req.body.userotp;
  if(otp==userotp){
    console.log("otp matches");
    next(); 
    return res.json({
      successMessage: "success",
      
    });
    }

    
    else{
      console.log("not match");
      return res.status(403).send("incorrect otp");
    }
};


module.exports = { verifyUser,sendotp,verifyotp };

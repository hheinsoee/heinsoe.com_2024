var md5 = require('md5');
var jwt = require("jsonwebtoken");
var secret = "helol";
export const generateToken = (data) => {
  return jwt.sign(
    {
      data: data,
    },
    secret,
    { expiresIn: 30 * 24 * 60 * 60 }
  );
};

//jwt.verify(token, secretOrPublicKey, [options, callback]

export const verifyToken = (token, cb) => {
  // let token = req.headers["x-access-token"];

  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      cb(err);
    } else {
      cb(null, decode);
    }
  });
};

export const encryptPassword = (password) => {
  return md5(md5(password) + 'madin');
}
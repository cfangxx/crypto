
var jwt     = require("jsonwebtoken");
var expires = moment().add('hours', 16).valueOf()
const JWT_SECRET = "tstsecret"
var token = jwt.encode({
  email: "cfang@juewang.com",
  fullName : "陈存胜",
  exp: expires
}, JWT_SECRET);





 try {
	var decoded = jwt.decode(token, JWT_SECRET);

// handle token here

} catch (err) {
	return next();
}

if (decoded.exp <= Date.now()) {
  res.end('Access token has expired', 400);
}



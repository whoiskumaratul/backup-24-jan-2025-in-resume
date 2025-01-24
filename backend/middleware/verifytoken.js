
const jwt = require('jsonwebtoken'); // Import JWT library
const secretKey = "mysecretkey"


const verifytoken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log("token verify wala aa gaya hai", token)

  if (!token) {
    return res.status(401).json({ status: false, error: 'Unauthorized' });
  }

  try {
    const user = jwt.verify(token, secretKey);
    req.user = user; // Attach decoded user to request
    next();
  } catch (err) {
    return res.status(403).json({ status: false, error: 'Invalid token' });
  }
};

// const verifytoken = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   console.log(token)
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const decoded = jwt.verify(token, secretKey);
//     req.user = decoded; // Attach user info (like id, role) to the request object
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: 'Invalid or expired token.' });
//   }
// };


// // try {
// //   const user = jwt.verify(token, secretKey); // Decode the token
// //   res.status(200).json({ status: true,  name: user.name, email: user.email, user:user }); // Respond with user details
// // } catch (error) {
// //   res.status(403).json({status: false, error: 'Invalid token' });
// // }
// // };


 module.exports = verifytoken;

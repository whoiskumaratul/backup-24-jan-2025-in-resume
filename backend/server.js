const express = require('express')
const { dbConnect } = require('./mongodb/mongodb')
const { ObjectId } = require('mongodb');
const app = express()
const port = 8000
require('./mongodb/config')
const cors = require('cors')
const cookieParser = require('cookie-parser')


//const SignupSchema = require('./SignupSchema/SignupSchema')
//const LoginSchema = require('./LoginSchema/LoginSchema')

const Users = require('./SignupSchema/SignupSchema')
const verifyToken = require('./middleware/verifytoken')



const jwt = require('jsonwebtoken')
const secretKey = "mysecretkey"

const bcrypt = require('bcrypt');

app.use(express.json())
app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
}))
app.use(cookieParser())


app.get('/', async (req, resp) => {
  let data = await Users.find()
  console.log(data)
    resp.send('Hello World')
    resp.end()
})



app.get('/api/profile/:_id', async (req, resp) => {
  try {
    const userId = new ObjectId(req.params._id);
    console.log("From single data fetching" , userId)
       let data = await Users.findOne({ _id  : userId });
       
       if(!data){
           return resp.status(404).send("No Data found");
       }else{
           
          return resp.send(data);
       }    
   } catch(error){
       console.log("Error retrieving document", error);
       resp.status(500).send({error : "internal Server Error"})
   }
})
        




app.post('/api/signup', async (req, resp) => {
    try {
        // Check if user already exists
        const existingUser = await Users.findOne({ email: req.body.email });
        if (existingUser) {
            return resp.status(409).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user object
        const userData = { ...req.body, password: hashedPassword };

        // Save user to database
        const newUser = new Users(userData);
        const result = await newUser.save();
        console.log(result)

        // Generate JWT
        const token = jwt.sign(
            { id: result._id, email: result.email }, // Payload
            secretKey , // Secret key (store securely in .env file)
            { expiresIn: '1h' } // Token expiration
        );

        // Send success response with JWT
        resp.status(201).json({
            message: 'User created successfully',
            token: token, // Include the token in the response
            user: { id: result._id, email: result.email },
        });

    } catch (error) {
        console.error('Error:', error);
        resp.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/login', async (req, resp) =>{
    try {
        const { email, password } = req.body;
        // let data = await Users.findOne({email: req.body.email, password: req.body.password 
        let data = await Users.findOne({email
         });
         if (!data) {
            return resp.status(401).json({ message: 'Invalid email or password' });
            }
             //compare the password with the hashed password

             const isPasswordValid = await bcrypt.compare(password, data.password);
             if(!isPasswordValid)
             {
                return resp.status(401).json({error: 'Invalid email or password'})
             }


            const token = jwt.sign(
                { id: data._id, email: data.email, name:data.name, userType: data.UserType}, // Payload
                secretKey, // Secret key (store securely in .env file)
                { expiresIn: '1h' } // Token expiration
                );
                
resp.cookie('jwt', token, {

    httpOnly: true,

    secure: true,

    sameSite: 'strict' // Consider setting sameSite for further protection

});
                resp.status(200).json({
                    status: true,
                    message: 'Login successfuL',
                    token: token, // Include the token in the response
                    user: { id: data._id, email: data.email, name: data.name, userType: data.UserType },
                    }); 
                    } catch (error) {
                        console.error('Error:', error);
                        resp.status(500).json({ error: 'Internal Server Error' });

                        // Set cookie with HttpOnly flag

                        }                       
                        
});

app.get('/api/profile', (req, res) => {
    const token = req.cookies.jwt; // Retrieve the JWT from the HTTP-only cookie
    if (!token) {
      return res.status(401).json({status: false, error: 'Unauthorized' });
    }
  
    try {
      const user = jwt.verify(token, secretKey); // Decode the token
      res.status(200).json({ status: true,  name: user.name, email: user.email, user:user }); // Respond with user details
    } catch (error) {
      res.status(403).json({status: false, error: 'Invalid token' });
    }
  });

app.put('/api/profile/:id', verifyToken, async (req, res) => {
  
    try {
      const userId = new ObjectId(req.params.id);
      console.log(userId)
      const data = await Users.updateOne(
        { _id: userId }, // Query by ID
        { $set: req.body  } // Update fields
      );

    if(data.matchedCount === 0) {
      return res.status(404).json({ status: false, error: 'User not found' });
    }

      res.status(200).json({ status: true, data });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
    

app.listen(port,  () => {
    console.log(`Server is running on port ${port}`)
})

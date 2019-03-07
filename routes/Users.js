const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
 const nodemailer = require('nodemailer');
 const Sequelize = require('sequelize')
const User = require("../models/User")
global.crypto = require('crypto')
users.use(cors())
const Op = Sequelize.Op;
process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        confirmpassword:req.body.confirmpassword,
        created: today
    }
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({
                                status: user.email + 'registered'
                            })
                        })
                        .catch(err => {
                            res.send('error:' + err)
                        })
                })
            } else {
                res.json({
                    error: "User already Exists"
                })

            }
        })
        .catch(err => {
            res.send('error:' + err)
        })

})
users.post('/login', (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }

        })
        .then(user => {
            if(user){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
            }else{
                res.status(400).json({
                    error: "User does not exist"
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
})
users.post('/forgot', (req, res) => {
    if (req.body.email === '') {
        res.status(400).send('email required');
      }
      console.error(req.body.email);
      User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        if (user === null) {
          console.error('email not in database');
          res.status(403).send('email not in db');
        } else {
          const token = crypto.randomBytes(20).toString('hex');
        
          user.update({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 360000,
          });
  
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'testert5911@gmail.com',
              pass: `testert5911@9`,
            },
          });
  
          const mailOptions = {
            from: 'testert5911@gmail.com',
            to: `${user.email}`,
            subject: 'Link To Reset Password',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
              + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
              + `http://localhost:3000/resetpassword/${token}\n\n`
              + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          };
         
          console.log('sending mail');
          console.log('first called');
  
          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.error('there was an error: ', err);
            } else {
              console.log('here is the res: ', response);
              res.status(200).json('recovery email sent');
            }
          });
        }
      });
    })

    users.get('/reset',(req,res,next)=>{
User.findOne({
  where:{
    resetPasswordToken:req.query.resetPasswordToken,
    resetPasswordExpires:{
      OP:Date.now(),
    },
  },
}).then(user =>{
  if(user == null){
    console.log('password reset link is invalid or expired')
    res.json('password reset link is invalid or expired')
  }else{
    res.status(200).send({
      first_name:user.first_name,
      message:'password link reset a ok'
    });
  }
    });
  });
  const BCRYPT_SALT_ROUNDS = 12;

  users.put('/resetpassword', (req, res) => {
    User.findOne({
      where: {
        first_name: req.body.first_name,
      },
    }).then((user) => {
      if (user != null) {
        console.log('user exists in db');
        bcrypt
          .hash(req.body.password, BCRYPT_SALT_ROUNDS)
          .then((hashedPassword) => {
            user.update({
              password: hashedPassword,
              resetPasswordToken: null,
              resetPasswordExpires: null,
            });
          })
          .then(() => {
            console.log('password updated');
            res.status(200).send({ message: 'password updated' });
          });
      } else {
        console.error('no user exists in db to update');
        res.status(401).json('no user exists in db to update');
      }
    });
  });


   
     
  

    
  


module.exports = users

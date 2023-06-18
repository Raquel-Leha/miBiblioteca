//Rutas para usuario

const express = require('express');
const router = express.Router();
const UserSchema = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authorize = require("../middlewares/auth");
const { check, validationResult } = require("express-validator");

//api/users

//Sign-up

router.post(
  "/register-user",
  [
    check("name")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage("Tu nombre debe tener al menos 3 caracteres"),

    check("email", "Email is required").not().isEmpty(),

    check(
      "password",
      "Password should be between 5 to 8 characters long"
    ).isLength({ min: 5, max: 8 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new UserSchema({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then((response) => {
            res.status(201).json({
              message: "User successfully created!",
              result: response,
            });
          })
          .catch((error) => {
            console.log("esto no va del todo bien")
            res.status(500).json({
              error: error,
            });
          });
      });
    }
  }
);

//Sign-in
router.post("/signin", (req, res, next) => {
  let getUser;
  UserSchema.findOne({
      email: req.body.email
  }).then(user => {
      if (!user) {
          return res.status(401).json({
              message: "Authentication failed"
          });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
  }).then(response => {
      if (!response) {
          return res.status(401).json({
              message: "Authentication failed"
          });
      }
      let jwtToken = jwt.sign({
          email: getUser.email,
          userId: getUser._id
      }, "longer-secret-is-better", {
          expiresIn: "1h"
      });
      res.status(200).json({
          token: jwtToken,
          expiresIn: 3600,
          _id: getUser._id
      });
  }).catch(err => {
      return res.status(401).json({
          message: "Authentication failed"
      });
  });
});
//Get Users
router.route('/').get((req, res) => {
    UserSchema.find((error, response) => {
        if(error) {
            return next (error)
        }else{
            res.status(200).json(response)
        }
    })
})

//Get Single User

router.route('/profile/:id').get(authorize, (req, res, next) => {
  let id = req.params.id;
  console.log(id)
    UserSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})


//Delete User

router.route('/delete-user/:id').delete((req, res, next) => {
    UserSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})



module.exports = router;

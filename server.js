// importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

//firebase admin setup
let serviceAccount = require("./ecom-website-33ca3-firebase-adminsdk-uazhi-ed8cc28b94.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

// declare static path
let staticPath = path.join(__dirname, "public");

// initializing express.js
const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

// routes
// home route
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

//signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post('/signup', (req, res) => {
    let { name, email, password } = req.body;

    // form validations
    if (name.length < 3) {
        return res.json({'alert': 'name must be at least 3 letters long'});
    } else if (!email.length) {
        return res.json({'alert': 'enter your email'});
    } else if (password.length < 5) {
        return res.json({'alert': 'password should be at least 5 letters long'});
    } 
     //store user in db
    db.collection('users').doc(email).get()
    .then(user => {
        if(user.exists) {
            return res.json({'alert': 'email already exists'});
        } else {
            //encrypt the password before storing it
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    req.body.password = hash;
                    db.collection('users').doc(email).set(req.body)
                    .then(data => {
                        res.json ({
                            name: req.body.name,
                            email: req.body.email,
                            seller: req.body.seller
                        })
                    })
                })
            })
        }
    })

})

// login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post ('/login', (req, res) => {
    let { email, password } = req.body;

    if (!email. length || !password.length) {
        return res.json({'alert': 'fill all the inputs'})
    }

    db.collection('users').doc(email).get()
    .then(user => {
        if (!user.exists) { // if email does not exists
            return res.json({'alert': 'log in email does not exists'})
        } else {
            bcrypt.compare(password, user.data().password, (err, result) => {
                if (result) {
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller
                    })
                } else {
                    return res.json({'alert': 'password is incorrect'});
                }
            })
        }
    })
})

// seller route
app.get('/seller', (req, res) => {
    res.sendFile(path.join(staticPath, "seller.html"));
})

app.post('/seller', (req, res) => {
    let { name, about, address, email } = req.body;
    if (!name.length || !address.length || !about.length) {
        return res.json({'alert': 'some information is invalid'});
    } else {
        //update users seller status
        db.collection('sellers').doc(email).set(req.body)
        .then(data => {
            db.collection('users').doc(email).update({
                seller: true
            }).then(data => {
                res.json(true);
            })
        })
    }
})

app.listen(3000, () => {
    console.log('listening on port 3000.......');
})
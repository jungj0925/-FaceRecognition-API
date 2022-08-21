import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '1',
            name: 'John',
            email: 'john@gmail.com',
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: "bananas",
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => { 

    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, 10, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '3',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('Not Found')
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('Not Found');
    }
})

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// });

// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     // result == false
// });

app.listen(3000, () => {
    console.log('Server working');
})

/*

/ root route (responding with this is working)
/signin -> POST req, res with success/fail - POST because password is being used, http request
/register --> POST req, res with new created user (new user)
/profile/:userId --> GET (user)
/image --> PUT (updating user profile) return user object

*/
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

import {handleRegister} from './controllers/register.js';
import {handleSignIn} from './controllers/signIn.js';
import {handleProfileGet} from './controllers/profile.js';
import {handleImage, handleApiCall} from './controllers/image.js';


const db = knex ({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '5432',
        user: 'postgres',
        password: '090327ha',
        database: 'facerecog'
    }
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => {handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
})

/*

/ root route (responding with this is working)
/signin -> POST req, res with success/fail - POST because password is being used, http request
/register --> POST req, res with new created user (new user)
/profile/:userId --> GET (user)
/image --> PUT (updating user profile) return user object

*/
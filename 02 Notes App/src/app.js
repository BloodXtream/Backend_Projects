const express = require('express');
const cookieParser = require('cookie-parser');
const noteRouter = require('./routers/note.router');
const authRouter = require('./routers/auth.router');

const app = express();

app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/notes', noteRouter); // Mount the note router
app.use('/api/auth', authRouter); // Mount the auth router

module.exports = app;
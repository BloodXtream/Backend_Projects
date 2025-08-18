const app = require('./src/apps');
const connectToDB = require('./src/db/db');

require('dotenv').config();

connectToDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});   
require('dotenv').config();
const app = require('./src/app');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running  port ${process.env.PORT} !`);
});
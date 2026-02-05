const app = require('./src/app')
const connectToDB = require('./src/config/db')
require('dotenv').config();

const PORT = process.env.PORT;

connectToDB();


app.listen(PORT, ()=>{
    console.log(`server is runing on ${PORT}`);
})
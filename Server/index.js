const express = require("express")
require("dotenv").config()
const connectDB = require('./config/db')
const { errorhandler } = require("./Middelwares/errorHandler")
const app = express()
const cors = require("cors")
const helmet = require("helmet")
// DB 

connectDB()


app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.DOMAIN_NAME,
}));
app.use(helmet())
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.use('/api/auth', require('./Routers/AuthRouter'))
app.use('/api/user', require('./Routers/UserRoute'))
app.use('/api/job', require('./Routers/JobsRouter'))
app.use('/api/company', require('./Routers/CompanyRouter'))
app.use('/api/app', require('./Routers/ApplicationRouter'))
app.use(errorhandler)
// Listen

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT}`)
})
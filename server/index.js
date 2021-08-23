import express  from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express();



app.use(express.json({limit:"30mb", extended: true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL = 'mongodb+srv://KaushikDeka:bunny123@cluster0.n3xkp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=>console.log(`Server Running on port: ${5000}`)))
    .catch((error)=>console.log(error.message))


mongoose.set('useFindAndModify', false)
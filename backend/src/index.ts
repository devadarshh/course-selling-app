import express from 'express'
import 'dotenv/config'
import userRouter from './routes/userRouter'
import adminRouter from './routes/adminRouter';
import courseRouter from './routes/courseRouter';
import cors from 'cors'
const app = express();
app.use(cors())
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use('/api/v1/user',userRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/courses',courseRouter)

app.listen(PORT,()=>{
    console.log("app is running on port: ",PORT);
})
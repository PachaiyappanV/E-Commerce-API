require('dotenv').config();
require('express-async-errors');

//express
const express=require('express')
const app=express();

//rest of the packages
const morgan=require('morgan');  //http request logger
const cookieparser=require('cookie-parser'); //it parses cookies from client requests
const fileUpload=require('express-fileupload'); //it is used to parse the files from the client requests
        //security packages//
const rateLimiter=require('express-rate-limit');
const helmet=require('helmet');
const xss=require('xss-clean');
const cors=require('cors');
const mongoSanitize=require('express-mongo-sanitize');

//importing database connection
const connectDB=require('./db/connect');

//importing routing middlewares
const authRouter=require('./routes/authRoutes');
const userRouter=require('./routes/userRoutes');
const productRouter=require('./routes/productsRoutes');
const reviewRouter=require('./routes/reviewRoutes');
const orderRouter=require('./routes/orderRoutes');

//importing error handling middlewares
const errorHandler=require('./middleware/error-handler');
const notFound=require('./middleware/not-found');

//using security middlewares
app.set('trust proxy',1);
app.use(rateLimiter({
    windowMs:15*60*1000,
    max:60,
}));
app.use(xss());
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());

//using API request related middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieparser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());

//using routing middlewares
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/review',reviewRouter);
app.use('/api/v1/order',orderRouter);

//using error handling middlewares
app.use(notFound);
app.use(errorHandler);

//starting the server and the mongoDB database
const port=process.env.PORT||8080;
const start=async ()=>{
    try{
    await connectDB(process.env.MONGO_URI);
    console.log('Database connected successfully');
    app.listen(port,()=>console.log(`server is successfully running on PORT${port} `))
    }
    catch(error){
        console.log(error);
    }
}
start()
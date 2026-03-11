const express = require('express')
const connectDb = require('./mongoDb/dbconnection')
const productRouter = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')
const authRouter = require('./routers/authRouter')
const cookieParser = require('cookie-parser')
const otpVerifyRouter = require('./routers/otpVerifyRouter')
const cartRouter = require('./routers/cartRouter')
const categoryRouter = require('./routers/categoryRouter')

require('dotenv').config()


connectDb()
const port = process.env.PORT || 4000
const server = express()

//App-level middlewaresz
server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(cookieParser())


server.use('/api', productRouter)
server.use('/api', userRouter)
server.use('/api', authRouter)
server.use('/api', otpVerifyRouter)
server.use('/api', cartRouter)
server.use('/api', categoryRouter)



server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})

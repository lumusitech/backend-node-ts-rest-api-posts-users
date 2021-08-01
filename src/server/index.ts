import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'
import compression from 'compression'

import indexRoutes from '../routes/indexRoutes'
import postsRoutes from '../routes/postsRoutes'
import userRoutes from '../routes/userRoutes'

class Server {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    private config() {
        //mongodb
        const MONGO_URI = 'mongodb://localhost/restapi_posts'
        mongoose.connect(MONGO_URI || process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true
        })
            .then(db => console.log('mongo database connected'))
            .catch(err => console.log(err))

        this.app.set('port', process.env.PORT || 3000)

        // middlewars
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(compression())
    }

    public routes() {
        this.app.use('/api', indexRoutes)
        this.app.use('/api/posts', postsRoutes)
        this.app.use('/api/users', userRoutes)
    }

    public start() {
        this.app.listen(this.app.get('port'), () => console.log(`server running on port ${this.app.get('port')}`))
    }
}

const server = new Server()
export default server
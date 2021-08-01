import { Request, Response, Router } from 'express'
import User from '../models/User'

class UserRouter {
    public router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    public async getUsers(req: Request, res: Response): Promise<void> {
        const users = await User.find()
        res.json(users)
    }
    public async getUser(req: Request, res: Response): Promise<void> {
        const user = await User.findOne({ username: req.params.username }).populate('posts', 'title url -_id')
        res.json(user)
    }
    public async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, password, username, posts } = req.body
        const newUser = new User({ name, email, password, username, posts })
        await newUser.save()
        res.json({ data: newUser })
    }
    public async updateUser(req: Request, res: Response): Promise<void> {

    }
    public async deleteUser(req: Request, res: Response): Promise<void> {

    }

    public routes() {
        this.router.get('/', this.getUsers)
        this.router.get('/:username', this.getUser)
        this.router.post('/', this.createUser)
        this.router.put('/:url', this.updateUser)
        this.router.delete('/:url', this.deleteUser)
    }
}

const userRouter = new UserRouter()
export default userRouter.router
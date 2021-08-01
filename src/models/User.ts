import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, requerid: true, unique: true },
    createdAt: { type: Date, default: Date.now() },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

export default model('User', userSchema)
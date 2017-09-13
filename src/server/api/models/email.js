import mongoose from 'mongoose'

class Email extends mongoose.Schema {

    constructor() {
        super({
            from: String,
            to: String,
            subject: String,
            html: String,
            date: Date,
            owner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            read: {
                type: Boolean,
                default: false
            }
        })
    }
}
export default mongoose.model('Email', new Email)
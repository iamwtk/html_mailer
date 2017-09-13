import mongoose from 'mongoose'

const notification = new mongoose.Schema({
    date: Date,
    to: String,
    subject: String,
    unread: Boolean
})

export default notification
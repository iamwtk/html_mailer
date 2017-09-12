import mongoose from 'mongoose'

const notification = new mongoose.Schema({
    date: Date,
    to: String
})

export default notification
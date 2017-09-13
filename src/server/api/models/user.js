import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

import notifications from './user/notifications'

class User extends mongoose.Schema {
    constructor() {
        const user = super({
            login: {
                local: {
                    email: String,
                    password: String
                }
            },
            profile: {
                firstName: String,
                lastName: String,
                address1: String,
                address2: String,
                city: String,
                country: String,
                zip: String
            },
            notifications: [ notifications ]
            
        })
        
        user.methods.generateHash = this.generateHash;
        user.methods.validPassword = this.validPassword;
    }
    
    
    generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    }


    validPassword(password) { 
        return bcrypt.compareSync(password, this.login.local.password)
    }
}

export default mongoose.model('User', new User)
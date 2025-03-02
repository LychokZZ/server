const User = require('./User')
const Message = require('./Message')

class authController{ 

    async registation(req, res){
        try{
            const {username , password, email} = req.body
            console.log(username , password, email)
            const candidat = await User.findOne({username})
            if(candidat){
                return res.status(400).json({message: "Імя зайняте"})
            }
            const emails = await User.findOne({email})
            if(emails){
                return res.status(400).json({message: "Пошта зайнята"})
            }
            const user = new User({username, password, email})
            await user.save() 
            return res.json({message: "Sucessful"}) 
        }catch(e){
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }

    async sendLetter(req, res){
        try{
            const {sender , receiver , text } = req.body
            const message = new Message({sender , receiver , text })
            await message.save() 
            return res.json({message: "Sucessful"}) 
        }catch(e){
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async getLetter(req, res){
        try{
            const {username , password} = req.body

        }catch(e){
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async getContact(req,res){
        let contact = []
        try{
            const { user } = req.query;
            const sender = user
            const receiver = user
            const candidat_send = await Message.find({sender})
            const candidat_res = await Message.find({receiver})
            for(let i =0; i< candidat_send.length;i++){
                contact.push(candidat_send[i].receiver)
            }
            for(let i =0; i< candidat_res.length;i++){
                contact.push(candidat_res[i].sender)
            }
            const conect = new Set(contact)
            
            let Contacts = []
            for(const people of conect.keys()){
                Contacts.push(people)
            }
            return res.json(Contacts) 
        }catch(e){
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }
    
    async getChat(req,res){
        let messageChat = []
        try{
            const { user1, user2 } = req.query;
            const candidat_use1_send = await Message.find({sender : user1 })
            const candidat_use2_send = await Message.find({sender : user2 })
            for(let i=0; i<candidat_use1_send.length; i++){
                if(candidat_use1_send[i].receiver == user2){
                    messageChat.push({
                        user1 : candidat_use1_send[i].text ,
                        data : candidat_use1_send[i].timestamp
                    })
                }
            }
            for(let i=0; i<candidat_use2_send.length; i++){
                if(candidat_use2_send[i].receiver == user1){
                    messageChat.push({
                        user2 : candidat_use2_send[i].text ,
                        data : candidat_use2_send[i].timestamp
                    })
                }
            }
            messageChat.sort((a, b) => new Date(a.data) - new Date(b.data));
            
            return res.json(messageChat) 
        }catch(e){
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

}

module.exports = new authController()
const users = require('../Model/User')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { userName, password, email } = req.body
    console.log(userName, password, email)
    try {
        const existingUser = await users.findOne({ email })
        if (!existingUser) {
            const newUser = new users({
                userName, password, email, profilePicture: '', githubLink: '', linkdinLink: ''
            })
            await newUser.save()
            res.status(200).json(newUser)
        } else {
            res.status(404).json("User Alredy exists")
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await users.findOne({ email })
        if (user) {
            if (user.password == password) {
                const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
                res.status(200).json({ token, username: user.userName, userGit: user.githubLink, userLinkdin: user.linkdinLink, profilePicture: user.profilePicture })
            } else {
                res.status(404).json('email/password incorrect')
            }
        } else {
            res.status(404).json(user)
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.userProfileUpdate = async (req, res) => {
    try {
        const { userName, githubLink, linkdinLink, profilePicture } = req.body
        const picture = req.file ? req.file.filename : profilePicture

        const user = await users.findByIdAndUpdate({ _id: req.payload }, {
            userName, githubLink, linkdinLink, profilePicture: picture
        }, { new: true })
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json(error)
    }
}
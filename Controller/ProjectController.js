const projects = require('../Model/Project')

exports.addProject = async (req, res) => {
    const { title, description, languages, github, demo } = req.body
    const picture = req.file.filename
    const userId = req.payload
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json('Project Already Added!!')
        } else {
            const newProject = new projects({
                title, description, languages, github, demo, picture, userId
            })
            await newProject.save()
            res.status(201).json(newProject)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(400)
    }
}

exports.getAllUserProjects = async (req, res) => {
    const userId = req.payload
    try {
        const userProjects = await projects.find({ userId })
        res.status(200).json(userProjects)
    } catch (error) {
        console.log(error)
        res.status(400).json(400)
    }
}

exports.getAllProjects = async (req, res) => {
    try {
        const allProjects = await projects.find()
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params
        const deletedProject = await projects.findByIdAndDelete({ _id: id })
        res.status(200).json('Project deleted')
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

exports.updateProject = async (req, res) => {
    const { title, description, languages, github, demo, picture } = req.body
    const image = req.file ? req.file.filename : picture
    try {
        const existingProject = await projects.findByIdAndUpdate({ _id: req.params.id }, {
            title,
            description,
            languages,
            github,
            demo,
            picture: image,
            userId: req.payload
        })
        await existingProject.save()
        res.status(200).json(existingProject)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
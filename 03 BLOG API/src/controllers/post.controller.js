const postModel = require('../models/post.model')

async function createPost(req, res) {
    try {
        const { title, content } = req.body

        const post = await postModel.create({
            title,
            content,
            author: req.body.id
        })

        res.status(201).json({
            message: "Post created Successfully",
            post
        })
    } catch (err) {
        res.status(500).json({
            message: `Error Creating Post: ${err}`
        })
    }
}

async function getAllPost(req, res) {
    try {
        const allPost = await postModel.find()
        res.status(200).json({
            message: "Fetched all post",
            allPost
        })
    } catch (err) {
        res.status(500).json({
            message: `Error while fetching the pOsts: ${err}`
        })
    }
}

async function getPostById(req, res) {
    try {
        const post = await postModel.findById(req.params.id)

        if (!post) {
            res.status(404).json({
                message: "POST not found"
            })
        }

        res.status(200).json({
            message: `post fetched successfully`,
            post
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching the post",
            err
        })
    }

}

async function updatePost(req, res) {
    try {
        const post = await postModel.findById(req.params.id)

        if (!post) {
            res.status(404).json({
                message: "Post not found"
            })
        }

        if (post.author.toString() !== req.user.id) {
            res.status(403).json({
                message: "user can update only its profile"
            })
        }

        post.title = req.post.title || post.title
        post.content = req.post.content || post.content

        await post.save()

        res.status(200).json({ message: "Post updated successfully", post })
    } catch (err) {
        return res.status(500).json({ message: `Error updating the post: ${err}` })
    }
}

module.exports = {
    createPost,
    getAllPost,
    getPostById,
    updatePost
}
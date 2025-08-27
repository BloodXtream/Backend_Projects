const Comment = require('../models/comment.model')
const Post = require('../models/post.model')

async function addComment(req, res) {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ message: `Post not found...!` })

        const comment = new comment({
            content,
            author: req.user.id, // comes from the middleware
            post: req.user.id
        })

        await comment.save()

        res.status(201).json({
            message: `Comment added successfully`
        })
    } catch (err) {
        return res.status(500).json({ message: `Error adding the comment: ${err}` })
    }
}

async function dltComment(req, res) {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) return res.status(404).json({ message: "Comment not found" })

        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can delete only your own comments" })
        }

        await comment.deleteOne()
        res.json({ message: "Comment deleted" })

    }
    catch (err) {
        return res.status(500).json({ message: `Error while deleting comment:${err}` })
    }
}

module.exports = {
    addComment,
    dltComment
}
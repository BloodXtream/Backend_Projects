const userModel = require('../models/user.model')

async function getUserProfile(req, res) {
    try {
        const userId = req.params.id
        const user = await userModel.findById(userId).select('-password')

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User fetched Successfully",
            user
        })
    }
    catch (err) {
        res.status(500).json({
            message: `Error in fetching User profile: ${err}`,
        })
    }
}

async function updateUserProfile(req, res) {
    try {
        const userId = req.params.id

        if (req.user.id !== userId) {
            return res.status(403).json({
                message: "User can update its own profile only"
            })
        }

        const updateUser = await userModel.findByIdAndUpdate(
            userId,
            req.body,
            { new: true, runValidators: true }
        ).select("-password")

        res.status(200).json({
            message: "User Profile updated successfully",
            user: updateUser
        })
    } catch (err) {
        res.status(500).json({
            message: `Error updating the profile: ${err}`
        })
    }
}

module.exports = {
    getUserProfile,
    updateUserProfile
}
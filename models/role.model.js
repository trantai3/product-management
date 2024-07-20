const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        permission: {
            type: Array,
            default: []
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    }, 
    {
        timestamps: true
    }
)

const Role = mongoose.model("Role", roleSchema, "roles")  // 1: name module 3: collection

module.exports = Role
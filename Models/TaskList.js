const mongoose = require('mongoose');

const TaskListSchema = mongoose.Schema(
    {
        name:{
            type: String
        },
        description:{
            type: String
        },
        active:{
            type: Boolean,
            default:false
        },
        
    },
    { timestamps: true }
);

const TaskListModel = mongoose.model("tasklist",TaskListSchema);
module.exports = TaskListModel;
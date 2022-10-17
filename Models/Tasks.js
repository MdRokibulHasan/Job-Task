const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
    {
        taskname:{
            type: String
        },
        description:{
            type: String
        },
        duedate:{
            type: String
        },
        period:{
            type: String
        },
        periodtype:{
            type: String
        },
        tasklistid:{
            type: String
        }
        
    },
    { timestamps: true }
);

const TaskModel = mongoose.model("task",TaskSchema);
module.exports = TaskModel;
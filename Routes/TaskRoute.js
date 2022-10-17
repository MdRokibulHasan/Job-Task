const express = require('express');
const router = express.Router();

const TaskList = require('../Models/TaskList.js')
const Tasks = require('../Models/Tasks.js');

router.post('/createtasklist',async(req,res)=>{
    const {name,description} = req.body;
    try{
        const tasklist = await TaskList.create({
            name,
            description,
        })

        if(tasklist){
            res.status(200).json({
                _id:tasklist._id,
                name:tasklist.name,
                description:tasklist.description
            });
        }else{
            res.status(400).json({message:"Failed to create tasklist"})
        }
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/createtask',async(req,res)=>{
    const {taskname,description,duedate,periodtype,tasklistid} = req.body;
    //indian formate: dd-mm-yyyy
    //iso formate: yyyy-mm-dd

    let period;

    if(periodtype === "monthly"){
        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        var today = new Date();
        var date = monthNames[today.getMonth()] + " " +today.getFullYear();

        period = date;
    }

    try{
        const task = await Tasks.create({
            taskname,
            description,
            duedate,
            period,
            periodtype,
            tasklistid,
        })

        if(task){
            res.status(200).json({
                _id:task._id,
                taskname:task.taskname,
                description:task.description,
                duedate:task.duedate,
                period:task.period,
                periodtype:task.periodtype,
                tasklistid:task.tasklistid
            });
        }else{
            res.status(400).json({message:"Failed to create tasklist"})
        }
    }catch(err){
        res.status(500).json(err);
    }

});
router.get('/tasklist',async(req,res)=>{
    try{
        let tasklist = await Tasks.find();
        const taskcount = await Tasks.countDocuments({})
        tasklist = tasklist.map((list,index)=>{
            const {tasklistid,createdAt,updatedAt, ...otherDetails} = list._doc
            return otherDetails
        })
        res.status(200).json({taskcount,tasklist});
    }catch(error){
        res.status(500).json(error);
    }
    // res.send("task list api");
});

module.exports = router;
//requiring mongoose
const mongoose = require('mongoose');
//making taskSchema with three fields
const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        required : true
    },
    category:{
        type: String,
        required: true
    },
    dueDate:{
        type: String,
        required:true
    }
});

const Tasks = mongoose.model('Tasks', taskSchema);
//exporting the tasks
module.exports = Tasks;
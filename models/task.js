var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var TaskSchema = new schema({
    itemName: String,
    itemCategory: String,
    itemCompleted: {type: Boolean, default: false},
    itemDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('TaskModel',TaskSchema);
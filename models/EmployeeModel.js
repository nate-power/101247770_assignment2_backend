const mongoose = require('mongoose');

validateEmail = (email) => {
    const match = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return match.test(email);
};

const EmployeeModelSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },

    firstName: {
        type: String,
        required: "Please provide a firstname.",
        trim: true
    },

    lastName: {
        type: String,
        required: "Please provide a lastname.",
        trim: true
    },

    emailId: {
        type: String,
        required: "Please provide an email address.",
        trim: true,
        lowercase: true,
        validate: [validateEmail, "Please create a valid email address."]
    }
});

const EmployeeModel = mongoose.model("EmployeeModel", EmployeeModelSchema);
module.exports = EmployeeModel;
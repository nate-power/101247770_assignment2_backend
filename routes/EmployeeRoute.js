const express = require('express');
const employeeModel = require('../models/EmployeeModel');
const app = express();

// Get all employees
app.get('/api/v1/employees', async (req, res) => {   
    try {
        const employee = await employeeModel.find({});
        res.status(200).send(employee);
    } 
    catch (err) {
        res.status(500).send(err);
    }
});


// Create an employee
app.post('/api/v1/employees', async (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Employee cannot be empty."
        });
    }    
    try {
        const employee = new employeeModel(req.body)          
        const newId = await employeeModel.find().sort({id: -1}).limit(1);
        if (newId.length === 0) {
            employee.id = 1
        }
        else {
            employee.id = newId[0].id + 1;
        }        
        await employee.save();
        res.status(201).send("Employee Saved!\n" + employee);
    } 
    catch (err) {        
        res.status(500).send(`
        ${err.errors?.emailId?.message !== undefined ? err.errors.emailId.message : ''}
        ${err.errors?.firstName?.message !== undefined ? err.errors.firstName.message : ''}
        ${err.errors?.lastName?.message !==undefined ? err.errors.lastName.message : ''}
        `);
    }    
});


// Retrieve an employee
app.get('/api/v1/employees/:id', async (req, res) => {
    try {
        const employee = await employeeModel.find({id: req.params.id})
        if (!employee) {
            res.status(404).send("Employee not found.");
        }
        res.status(200).send(employee);
    } 
    catch (err) {
        res.status(500).send(err);
    }
});


//Update an employee
app.put('/api/v1/employees/:id', async (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Employee cannot be empty."
        });
    }  
    try {
        req.body.id = req.params.id;
        const employee = await employeeModel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });
        if (!employee) {
            res.status(404).send("No employee found to be updated.");
        }
        res.status(200).send(`Employee ID:${employee.id} updated!\n` + employee);
    } 
    catch (err) {
        res.status(500).send(`
        ${err.errors?.emailId?.message !== undefined ? err.errors.emailId.message : ''}
        ${err.errors?.firstName?.message !== undefined ? err.errors.firstName.message : ''}
        ${err.errors?.lastName?.message !==undefined ? err.errors.lastName.message : ''}
        `);
    }
});


//Delete an employee
app.delete('/api/v1/employees/:id', async (req, res) => {   
    try {
        const employee = await employeeModel.findOneAndDelete({ id: req.params.id })
        if (!employee) {
            res.status(404).send("No employee found to be deleted.");
        }       
        res.status(204).send();
    } 
    catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app;
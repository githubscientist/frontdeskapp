const Customer = require('../models/Customer');

const customerController = {
    createCustomer: async (request, response) => {
        try {
            // get the customer data from request body
            const { name, email, location, phone } = request.body;

            // Check if the customer already exists
            const customer = await Customer.findOne({ email });

            if (customer) {
                return response.status(400).json({ message: 'Customer already exists' });
            }

            // create a new customer
            const newCustomer = new Customer({
                name, email, location, phone
            });

            // save the customer
            await newCustomer.save();

            // send the response
            response.status(201).json({ message: 'Customer created successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getCustomers: async (request, response) => {
        try {
            // get all the customers from the database
            const customers = await Customer.find().select('-__v -createdAt -updatedAt');

            // send the response
            response.status(200).json(customers);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getCustomerById: async (request, response) => {
        try {
            // get the customerId from the request params
            const { customerId } = request.params;

            // get the customer by id
            const customer = await Customer.findById(customerId).select('-__v -createdAt -updatedAt');

            // check if the customer does not exist
            if (!customer) {
                return response.status(404).json({ message: 'Customer not found' });
            }

            // send the response
            response.status(200).json(customer);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    updateCustomer: async (request, response) => {
        try {
            // get the customerId from the request params
            const { customerId } = request.params;

            // get the customer data from request body
            const { name, email, location, phone } = request.body;

            // update the customer
            await Customer.findByIdAndUpdate(customerId, {
                name, email, location, phone
            });

            // send the response
            response.status(200).json({ message: 'Customer updated successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    deleteCustomer: async (request, response) => {
        try {
            // get the customer id from the request params
            const { customerId } = request.params;

            // check if the customer exists
            const customer = await Customer.findById(customerId);

            if (!customer) {
                return response.status(404).json({ message: 'Customer not found' });
            }

            // delete the customer
            await Customer.findByIdAndDelete(customerId);

            // send the response
            response.status(200).json({ message: 'Customer deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = customerController;
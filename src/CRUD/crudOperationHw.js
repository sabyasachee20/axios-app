import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CrudOperationHw() {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState('');
    const [editingCustomer, setEditingCustomer] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:9999/cust/read');
            setCustomers(response.data);
        } catch (error) {
            console.error('There was an error fetching the customers!', error);
        }
    };

    const createCustomer = async () => {
        try {
            const response = await axios.post('http://localhost:9999/cust/add', {
                name,
                username,
                password,
                balance
            });
            setCustomers([...customers, response.data]);
            setName('');
            setUsername('');
            setPassword('');
            setBalance('');
        } catch (error) {
            console.error('There was an error creating the customer!', error);
        }
    };

    const updateCustomer = async (customer) => {
        try {
            const response = await axios.put(`http://localhost:9999/cust/update/${customer.id}`, customer);
            setCustomers(customers.map(c => (c.id === customer.id ? response.data : c)));
            setEditingCustomer(null);
            setName('');
            setUsername('');
            setPassword('');
            setBalance('');
        } catch (error) {
            console.error('There was an error updating the customer!', error);
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/cust/delete/${id}`);
            setCustomers(customers.filter(customer => customer.id !== id));
        } catch (error) {
            console.error('There was an error deleting the customer!', error);
        }
    };

    const handleEditClick = (customer) => {
        setEditingCustomer(customer);
        setName(customer.name);
        setUsername(customer.username);
        setPassword(customer.password);
        setBalance(customer.balance);
        setMessage('Button clicked');
    };
    
    const handleSaveClick = () => {
        if (editingCustomer) {
            updateCustomer({ ...editingCustomer, name, username, password, balance });
        } else {
            createCustomer();
        }
    };

    return (
        <div className="App">
            <h1>Customer Management</h1>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Balance"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                />
                <button onClick={handleSaveClick}>
                    {editingCustomer ? 'Update Customer' : 'Add Customer'}
                </button>
            </div>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        <h2>{customer.name}</h2>
                        <p>Username: {customer.username}</p>
                        <p>Password: {customer.password}</p>
                        <p>Balance: {customer.balance}</p>
                        <button onClick={() => handleEditClick(customer)}>Edit</button>
                        <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CrudOperationHw;

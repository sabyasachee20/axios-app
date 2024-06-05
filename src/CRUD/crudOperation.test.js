import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CrudOperationHw from './crudOperationHw';

const mockCustomers = [
    { id: 1, name: 'John', username: 'john123', password: 'password', balance: 100 },
    { id: 2, name: 'Alice', username: 'alice456', password: 'password', balance: 200 }
];

const mock = new MockAdapter(axios);

describe('CrudOperationHw', () => {
    beforeEach(() => {
        mock.reset();
    });

    it('renders customer list', async () => {
        mock.onGet('http://localhost:9999/cust/read').reply(200, mockCustomers);

        render(<CrudOperationHw />);

        await waitFor(() => expect(screen.getByText('John')).toBeInTheDocument());
        expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    it('adds a new customer', async () => {
        mock.onPost('http://localhost:9999/cust/add').reply(201, { id: 3, name: 'Bob', username: 'bob789', password: 'password', balance: 300 });

        render(<CrudOperationHw />);

        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Bob' } });
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'bob789' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.change(screen.getByPlaceholderText('Balance'), { target: { value: '300' } });
        fireEvent.click(screen.getByText('Add Customer'));

        await waitFor(() => expect(screen.getByText('Bob')).toBeInTheDocument());
    });

//     it('updates a customer', async () => {
//         mock.onPut('http://localhost:9999/cust/update/1').reply(200, { id: 1, name: 'John Doe', username: 'john123', password: 'password', balance: 500 });

//         render(<CrudOperationHw />);

//         fireEvent.click(screen.getByText('Edit'));
//         fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
//         fireEvent.click(screen.getByText('Update Customer'));

//         await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
//     });

//     it('deletes a customer', async () => {
//         mock.onDelete('http://localhost:9999/cust/delete/1').reply(200);

//         render(<CrudOperationHw />);

//         fireEvent.click(screen.getByText('Delete'));

//         await waitFor(() => expect(screen.queryByText('John')).not.toBeInTheDocument());
//     });

//     it('sets message when edit button is clicked', async () => {
//         render(<CrudOperationHw />);
//         fireEvent.click(screen.getByText('Edit'));
//         expect(screen.getByText('Button clicked')).toBeInTheDocument();
//     });
});

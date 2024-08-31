import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import './DrugOrders.css';

// Sample data for drug orders
const sampleOrders = [
    { id: '001', drugName: 'Paracetamol', brand: 'Tylenol', quantity: 100, orderDate: '2024-08-01', status: 'Completed' },
    { id: '002', drugName: 'Ibuprofen', brand: 'Advil', quantity: 50, orderDate: '2024-08-03', status: 'Completed' },
    { id: '003', drugName: 'Insulin', brand: 'Humalog', quantity: 30, orderDate: '2024-08-10', status: 'Cancelled' },
    { id: '004', drugName: 'Amoxicillin', brand: 'Amoxil', quantity: 80, orderDate: '2024-08-12', status: 'Pending' },
    { id: '005', drugName: 'Vitamin D', brand: 'D3', quantity: 120, orderDate: '2024-08-15', status: 'Completed' },
    { id: '006', drugName: 'Paracetamol', brand: 'Tylenol', quantity: 150, orderDate: '2024-08-20', status: 'Completed' },
    { id: '007', drugName: 'Ibuprofen', brand: 'Advil', quantity: 70, orderDate: '2024-08-22', status: 'Pending' },
    { id: '008', drugName: 'Insulin', brand: 'Humalog', quantity: 60, orderDate: '2024-08-25', status: 'Completed' },
    { id: '009', drugName: 'Amoxicillin', brand: 'Amoxil', quantity: 90, orderDate: '2024-08-27', status: 'Cancelled' },
    { id: '010', drugName: 'Vitamin D', brand: 'D3', quantity: 110, orderDate: '2024-08-30', status: 'Completed' },
    // Add more data as needed
];

const DrugOrders = () => {
    const [search, setSearch] = useState('');

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredOrders = sampleOrders.filter(
        (order) =>
            order.drugName.toLowerCase().includes(search.toLowerCase()) ||
            order.brand.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="drug-orders">
            <Form className="mb-3">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search by drug name or brand"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Drug Name</th>
                        <th>Brand</th>
                        <th>Quantity</th>
                        <th>Order Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.drugName}</td>
                            <td>{order.brand}</td>
                            <td>{order.quantity}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DrugOrders;

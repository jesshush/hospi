import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import './PatientInfo.css'; // Ensure you have this CSS file

const patientInfo = [
    { id: 'P001', name: 'John Doe', drugId: '001', doctor: 'Dr. Smith', orderDate: '2024-08-01', purchaseTime: '14:30' },
    { id: 'P002', name: 'Jane Roe', drugId: '002', doctor: 'Dr. Johnson', orderDate: '2024-08-03', purchaseTime: '10:15' },
    { id: 'P003', name: 'Mary Major', drugId: '003', doctor: 'Dr. Lee', orderDate: '2024-08-10', purchaseTime: '09:00' },
    { id: 'P004', name: 'James Brown', drugId: '004', doctor: 'Dr. White', orderDate: '2024-08-12', purchaseTime: '11:45' },
    { id: 'P005', name: 'Emily Davis', drugId: '005', doctor: 'Dr. Green', orderDate: '2024-08-15', purchaseTime: '13:20' },
    { id: 'P006', name: 'Michael Johnson', drugId: '006', doctor: 'Dr. Clark', orderDate: '2024-08-18', purchaseTime: '16:10' },
    { id: 'P007', name: 'Sarah Wilson', drugId: '007', doctor: 'Dr. Lewis', orderDate: '2024-08-20', purchaseTime: '08:30' },
    { id: 'P008', name: 'David Martinez', drugId: '008', doctor: 'Dr. Scott', orderDate: '2024-08-22', purchaseTime: '15:00' },
    { id: 'P009', name: 'Laura Thompson', drugId: '009', doctor: 'Dr. Anderson', orderDate: '2024-08-25', purchaseTime: '17:50' },
    { id: 'P010', name: 'Robert Garcia', drugId: '010', doctor: 'Dr. Miller', orderDate: '2024-08-27', purchaseTime: '12:05' },
    { id: 'P011', name: 'Olivia Martinez', drugId: '011', doctor: 'Dr. Taylor', orderDate: '2024-08-30', purchaseTime: '09:45' },
    { id: 'P012', name: 'Daniel Lee', drugId: '012', doctor: 'Dr. Hernandez', orderDate: '2024-09-01', purchaseTime: '14:20' },
    { id: 'P013', name: 'Sophia Rodriguez', drugId: '013', doctor: 'Dr. Robinson', orderDate: '2024-09-03', purchaseTime: '10:35' },
    { id: 'P014', name: 'Matthew Hall', drugId: '014', doctor: 'Dr. Walker', orderDate: '2024-09-05', purchaseTime: '11:50' },
    { id: 'P015', name: 'Isabella Young', drugId: '015', doctor: 'Dr. Young', orderDate: '2024-09-07', purchaseTime: '13:15' }
];

const PatientInfo = () => {
    const [search, setSearch] = useState('');

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredPatientInfo = patientInfo.filter(
        (info) =>
            info.name.toLowerCase().includes(search.toLowerCase()) ||
            info.doctor.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="patient-info-page">
            <div className="text-end mb-3">
                <Form className="search-bar">
                    <Form.Group controlId="search">
                        <Form.Control
                            type="text"
                            placeholder="Search by patient name or doctor"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Form>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Drug ID</th>
                        <th>Doctor</th>
                        <th>Order Date</th>
                        <th>Purchase Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatientInfo.map((info) => (
                        <tr key={info.id}>
                            <td>{info.id}</td>
                            <td>{info.name}</td>
                            <td>{info.drugId}</td>
                            <td>{info.doctor}</td>
                            <td>{info.orderDate}</td>
                            <td>{info.purchaseTime}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PatientInfo;

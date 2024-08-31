import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto'; // For Chart.js
import DrugInventoryTable from './components/DrugInventoryTable'; // Ensure this path is correct
import DrugOrders from './components/DrugOrders'; // Ensure this path is correct
import './App.css'; // Ensure this import is correct
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import PatientInfo from './components/PatientInfo'; // Import PatientInfo component
import StockAlerts from './components/StockAlerts'; // Import StockAlerts component

// Define components for the routes
const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;

const App = () => {
    const [showInventoryAlertsModal, setShowInventoryAlertsModal] = useState(false);
    const navigate = useNavigate();

    // Define the function to show the inventory page
    const goToInventory = () => {
        navigate('/inventory');
    };

    // Define the function to show the drug orders page
    const goToDrugOrders = () => {
        navigate('/orders');
    };

    // Function to handle showing the inventory alerts modal
    const handleShowInventoryAlertsModal = () => {
        setShowInventoryAlertsModal(true);
    };

    // Function to close the inventory alerts modal
    const handleCloseInventoryAlertsModal = () => {
        setShowInventoryAlertsModal(false);
    };

    // Sample data for charts
    const inventoryData = {
        labels: ['Paracetamol', 'Ibuprofen', 'Insulin', 'Amoxicillin', 'Cetirizine'],
        datasets: [{
            label: 'Stock Levels',
            data: [150, 80, 60, 100, 200],
            backgroundColor: ['#3498db', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6'],
            borderColor: ['#2980b9', '#c0392b', '#d35400', '#27ae60', '#8e44ad'],
            borderWidth: 1
        }]
    };

    const ordersData = {
        labels: ['Ordered', 'Delivered', 'Pending'],
        datasets: [{
            label: 'Drug Orders',
            data: [50, 40, 30],
            backgroundColor: ['#2ecc71', '#3498db', '#e74c3c'],
            borderColor: ['#27ae60', '#2980b9', '#c0392b'],
            borderWidth: 1
        }]
    };

    const drugConsumptionData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Paracetamol',
                data: [30, 25, 40, 35, 50, 45, 55, 60, 55, 50, 45, 40],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                fill: true
            },
            {
                label: 'Ibuprofen',
                data: [20, 18, 25, 30, 35, 32, 40, 42, 38, 36, 34, 30],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                fill: true
            },
            {
                label: 'Insulin',
                data: [15, 12, 18, 20, 22, 25, 30, 32, 35, 34, 30, 28],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                fill: true
            },
            {
                label: 'Amoxicillin',
                data: [10, 15, 20, 18, 22, 24, 28, 30, 35, 32, 28, 25],
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.2)',
                fill: true
            }
        ]
    };

    // Sample data for drug orders
    const sampleOrders = [
        { id: '001', drugName: 'Paracetamol', quantity: 100, orderDate: '2024-08-01', status: 'Completed' },
        { id: '002', drugName: 'Ibuprofen', quantity: 50, orderDate: '2024-08-03', status: 'Pending' },
        { id: '003', drugName: 'Insulin', quantity: 30, orderDate: '2024-08-10', status: 'Cancelled' },
    ];

    return (
        <Container fluid className="p-0">
            <Row noGutters>
                <Col xs={2} className="sidebar">
                    <h2 className="text-center">Hospital Dashboard</h2>
                    <ul className="list-unstyled">
                        <li><Link to="/" className="text-light">Overview</Link></li>
                        <li><Link to="/inventory" className="text-light">Inventory</Link></li>
                        <li><Link to="/orders" className="text-light">Drug Orders</Link></li>
                        <li><Link to="/patients" className="text-light">Patients</Link></li>
                        <li><Link to="/reports" className="text-light">Reports</Link></li>
                        <li><Link to="/settings" className="text-light">Settings</Link></li>
                    </ul>
                </Col>

                <Col xs={10} className="main-content">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <header className="header">
                                    <h1>Dashboard Overview</h1>
                                </header>

                                <Row className="mb-3">
                                    <Col>
                                        <div className="card" onClick={goToInventory}>
                                            <h3>Total Drugs Available</h3>
                                            <p>850</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="card" onClick={goToDrugOrders}>
                                            <h3>Drugs Ordered</h3>
                                            <p>120</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="card" onClick={handleShowInventoryAlertsModal}>
                                            <h3>Inventory Alerts</h3>
                                            <p>5 Critical</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="card" onClick={() => navigate('/patients')}>
                                            <h3>Patients Admitted</h3>
                                            <p>45</p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col>
                                        <div className="chart-container">
                                            <Bar data={inventoryData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="chart-container" style={{ width: '500px', height: '500px' }}>
                                            <Pie data={ordersData} options={{ responsive: true }} />
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col>
                                        <div className="chart-container">
                                            <h3>Drug Consumption Trends</h3>
                                            <Line data={drugConsumptionData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        } />
                        <Route path="/inventory" element={
                            <div className="drug-list-page">
                                <h2 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold', fontSize: '2rem' }}>
                                    Drug Inventory
                                </h2>
                                <div className="text-end mb-3">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => navigate('/')} 
                                        style={{ fontSize: '1rem' }}
                                    >
                                        Back to Dashboard
                                    </Button>
                                </div>
                                <DrugInventoryTable drugsPerPage={15} />
                            </div>
                        } />
                        <Route path="/orders" element={
                            <div className="drug-orders-page">
                                <h2 className="text-center mb-4">Drug Orders</h2>
                                <div className="text-end mb-3">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => navigate('/')} 
                                        style={{ fontSize: '1rem' }}
                                    >
                                        Back to Dashboard
                                    </Button>
                                </div>
                                <DrugOrders orders={sampleOrders} />
                            </div>
                        } />
                        <Route path="/patients" element={
                            <div className="patient-info-page">
                                <h2 className="text-center mb-4">Patient Information</h2>
                                <div className="text-end mb-3">
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => navigate('/')} 
                                        style={{ fontSize: '1rem' }}
                                    >
                                        Back to Dashboard
                                    </Button>
                                </div>
                                <PatientInfo />
                            </div>
                        } />
                        <Route path="/reports" element={<div>Reports Page</div>} />
                        <Route path="/settings" element={<div>Settings Page</div>} />
                    </Routes>
                </Col>
            </Row>

{/* Modal for Inventory Alerts */}
<Modal show={showInventoryAlertsModal} onHide={handleCloseInventoryAlertsModal} size="lg">
    <Modal.Header closeButton>
        <Modal.Title>Inventory Alerts</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <StockAlerts onClose={handleCloseInventoryAlertsModal} />
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseInventoryAlertsModal}>
            Close
        </Button>
    </Modal.Footer>
</Modal>

        </Container>
    );
}

export default App;

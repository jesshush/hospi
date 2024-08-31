import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form } from 'react-bootstrap';
import InventoryAlerts from './InventoryAlerts'; // Ensure this path is correct

// Export the drugs data
export const drugs = [
        { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2024-09-02", cost: "250", quantity: 150 },
        { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-08-30", cost: "164", quantity: 80 },
        { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2024-08-30", cost: "200", quantity: 60 },
        { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
        { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
        { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2025-01-15", cost: "250", quantity: 150 },
        { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-06-20", cost: "164", quantity: 80 },
        { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2025-03-12", cost: "200", quantity: 60 },
        { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
        { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
        { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
        { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2025-01-15", cost: "250", quantity: 150 },
        { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-06-20", cost: "164", quantity: 80 },
        { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2025-03-12", cost: "200", quantity: 60 },
        { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
        { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
        { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2025-01-15", cost: "250", quantity: 150 },
        { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-06-20", cost: "164", quantity: 80 },
        { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2025-03-12", cost: "200", quantity: 60 },
        { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
        { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
        { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2025-01-15", cost: "250", quantity: 150 },
        { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-06-20", cost: "164", quantity: 80 },
        { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2025-03-12", cost: "200", quantity: 60 },
        { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
        { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
        { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
        { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2025-01-15", cost: "250", quantity: 150 },
        { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-06-20", cost: "164", quantity: 80 },
        { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2025-03-12", cost: "200", quantity: 60 },
        { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
        { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
        
    ];


    const DrugInventoryTable = ({ drugsPerPage }) => {
        const [currentPage, setCurrentPage] = useState(1);
        const [searchTerm, setSearchTerm] = useState('');
        const [sortOrder, setSortOrder] = useState('asc');
        const [expiringDrugs, setExpiringDrugs] = useState([]);
        const [imminentDrugs, setImminentDrugs] = useState([]);
        const [showAlerts, setShowAlerts] = useState(false);
    
        useEffect(() => {
            const checkExpiryDates = () => {
                const today = new Date();
                const oneDayFromNow = new Date(today);
                oneDayFromNow.setDate(today.getDate() + 1);
                const tenDaysFromNow = new Date(today);
                tenDaysFromNow.setDate(today.getDate() + 10);
    
                const expiring = drugs.filter(drug => {
                    const expDate = new Date(drug.expDate);
                    return expDate <= oneDayFromNow && expDate > today;
                });
    
                const imminent = drugs.filter(drug => {
                    const expDate = new Date(drug.expDate);
                    return expDate <= tenDaysFromNow && expDate > oneDayFromNow;
                });
    
                if (expiring.length > 0 || imminent.length > 0) {
                    setExpiringDrugs(expiring);
                    setImminentDrugs(imminent);
                    setShowAlerts(true);
                } else {
                    setShowAlerts(false);
                }
            };
    
            checkExpiryDates();
        }, []);
    
        // Filtering drugs based on search term
        const filteredDrugs = drugs.filter(drug =>
            drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            drug.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        // Sorting drugs based on selected column and sort order
        const sortDrugs = (data, column) => {
            return data.slice().sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a[column] > b[column] ? 1 : -1;
                } else {
                    return a[column] < b[column] ? 1 : -1;
                }
            });
        };
    
        const sortedDrugs = sortDrugs(filteredDrugs, 'name');
    
        // Pagination logic
        const indexOfLastDrug = currentPage * drugsPerPage;
        const indexOfFirstDrug = indexOfLastDrug - drugsPerPage;
        const currentDrugs = sortedDrugs.slice(indexOfFirstDrug, indexOfLastDrug);
    
        const totalPages = Math.ceil(filteredDrugs.length / drugsPerPage);
    
        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        };
    
        const handleSearchChange = (event) => {
            setSearchTerm(event.target.value);
            setCurrentPage(1);
        };
    
        const handleSort = (column) => {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        };
    
        return (
            <>
                {showAlerts && (
                    <>
                        {expiringDrugs.length > 0 && (
                            <InventoryAlerts
                                alertType="danger"
                                alertMessage={`The following drugs are expiring in 1 day: ${expiringDrugs.map(drug => `${drug.name} (${drug.expDate})`).join(', ')}.`}
                            />
                        )}
                        {imminentDrugs.length > 0 && (
                            <InventoryAlerts
                                alertType="warning"
                                alertMessage={`The following drugs are expiring within 10 days: ${imminentDrugs.map(drug => `${drug.name} (${drug.expDate})`).join(', ')}.`}
                            />
                        )}
                    </>
                )}
    
                <Form className="mb-3">
                    <Form.Group controlId="search">
                        <Form.Control
                            type="text"
                            placeholder="Search by drug name or brand"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Form>
    
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')}>Drug Name</th>
                            <th onClick={() => handleSort('brand')}>Brand</th>
                            <th>Manufactured Date</th>
                            <th>Expiry Date</th>
                            <th>Cost</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDrugs.map((drug, index) => (
                            <tr key={index}>
                                <td>{drug.name}</td>
                                <td>{drug.brand}</td>
                                <td>{drug.mfgDate}</td>
                                <td>{drug.expDate}</td>
                                <td>{drug.cost}</td>
                                <td>{drug.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
    
                <Pagination>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </>
        );
    };
    
    export default DrugInventoryTable;
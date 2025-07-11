import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; // Replace with your Firebase config file
import { 
  FaHome, FaInfoCircle, FaServicestack, FaEnvelope, 
  FaArrowAltCircleRight, FaArrowCircleLeft, FaEye, 
  FaEdit, FaFileInvoice, 
  FaTruck
} from "react-icons/fa";
import { TbListNumbers } from "react-icons/tb";
import Logo from "../assets/PCW.png";
import { AiFillProduct } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoIosPerson } from 'react-icons/io';
import Sidebar from '../Sidebar/Sidebar';

const InvoiceNumbersPage = () => {
  const [billingInvoices, setBillingInvoices] = useState([]);
  const [customerBillingInvoices, setCustomerBillingInvoices] = useState([]);
   const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const billingQuery = query(collection(db, 'billing'), orderBy('createdAt', 'desc'));
        const billingSnapshot = await getDocs(billingQuery);
        const billingInvoices = billingSnapshot.docs.map(doc => doc.data().invoiceNumber);

        const customerBillingQuery = query(collection(db, 'customerBilling'), orderBy('createdAt', 'desc'));
        const customerBillingSnapshot = await getDocs(customerBillingQuery);
        const customerBillingInvoices = customerBillingSnapshot.docs.map(doc => doc.data().invoiceNumber);

        setBillingInvoices(billingInvoices);
        setCustomerBillingInvoices(customerBillingInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
};
  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const sectionHeadingStyle = {
    color: '#555',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
    marginTop: '30px',
    marginBottom: '10px',
  };

  const listStyle = {
    listStyleType: 'none',
    paddingLeft: '0',
  };

  const listItemStyle = {
    background: '#fff',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const noInvoicesStyle = {
    color: 'black',
    textAlign: 'center',
    fontStyle: 'italic',
  };

  return (
    <div className="main-container" style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
  
      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={containerStyle}>
          <h1 style={headingStyle}>Invoice Numbers</h1>
  
          <h2 style={sectionHeadingStyle}>Billing Collection</h2>
          {billingInvoices.length > 0 ? (
            <ul style={listStyle}>
              {billingInvoices.map((invoice, index) => (
                <li key={index} style={listItemStyle}>
                  {invoice}
                </li>
              ))}
            </ul>
          ) : (
            <p style={noInvoicesStyle}>No invoices found in Billing collection.</p>
          )}
  
          <h2 style={sectionHeadingStyle}>Customer Billing Collection</h2>
          {customerBillingInvoices.length > 0 ? (
            <ul style={listStyle}>
              {customerBillingInvoices.map((invoice, index) => (
                <li key={index} style={listItemStyle}>
                  {invoice}
                </li>
              ))}
            </ul>
          ) : (
            <p style={noInvoicesStyle}>
              No invoices found in Customer Billing collection.
            </p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default InvoiceNumbersPage;

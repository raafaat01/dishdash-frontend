import React, { useEffect, useState } from 'react';
import { getPendingAdmins, approveAdmin, rejectAdmin } from '../services/userService';

const PendingAdmins = () => {
    const [pendingAdmins, setPendingAdmins] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const fetchPendingAdmins = async () => {
        try {
            const data = await getPendingAdmins();
            setPendingAdmins(data);
        } catch (err) {
            setError('Failed to fetch pending admins');
        }
    };

    useEffect(() => {
        fetchPendingAdmins();
    }, []);

    const handleApprove = async (id) => {
        try {
            const res = await approveAdmin(id);
            setMessage(res);
            fetchPendingAdmins();
        } catch (err) {
            setError(err.response?.data || 'Failed to approve admin');
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await rejectAdmin(id);
            setMessage(res);
            fetchPendingAdmins();
        } catch (err) {
            setError(err.response?.data || 'Failed to reject admin');
        }
    };

    return (
        <div>
            <style>{`
        .pending-admins-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }
        .pending-admins-container h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333333;
        }
        .message {
          text-align: center;
          color: #28a745;
          margin-bottom: 1rem;
        }
        .error-message {
          text-align: center;
          color: #e74c3c;
          margin-bottom: 1rem;
        }
        .admin-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .admin-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
        }
        .admin-item:last-child {
          border-bottom: none;
        }
        .admin-info {
          font-size: 1rem;
          color: #333;
        }
        .admin-actions button {
          margin-left: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .approve-btn {
          background-color: #28a745;
          color: white;
        }
        .approve-btn:hover {
          background-color: #218838;
        }
        .reject-btn {
          background-color: #dc3545;
          color: white;
        }
        .reject-btn:hover {
          background-color: #c82333;
        }
      `}</style>

            <div className="pending-admins-container">
                <h2>Pending Admins</h2>
                {message && <p className="message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <ul className="admin-list">
                    {pendingAdmins.map((admin) => (
                        <li key={admin.id} className="admin-item">
                            <div className="admin-info">
                                {admin.username} (<span>{admin.email}</span>)
                            </div>
                            <div className="admin-actions">
                                <button className="approve-btn" onClick={() => handleApprove(admin.id)}>
                                    Approve
                                </button>
                                <button className="reject-btn" onClick={() => handleReject(admin.id)}>
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PendingAdmins;

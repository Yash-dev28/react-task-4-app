import React, { useState, useEffect } from 'react';
import './DataGrid.css';
import data from './data.json';

const DataGrid = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    setRecords(data);
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRecords = React.useMemo(() => {
    let sortableRecords = [...records];
    if (sortConfig.key !== null) {
      sortableRecords.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRecords;
  }, [records, sortConfig]);

  const filteredRecords = sortedRecords.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="datagrid-container">
      <h2>DataGrid</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th onClick={() => handleSort('lastSeen')}>
              Last Seen
              {sortConfig.key === 'lastSeen' && (
                sortConfig.direction === 'asc' ? ' ▲' : ' ▼'
              )}
            </th>
            <th onClick={() => handleSort('orders')}>
              Orders
              {sortConfig.key === 'orders' && (
                sortConfig.direction === 'asc' ? ' ▲' : ' ▼'
              )}
            </th>
            <th>Total Spent (INR)</th>
            <th>Latest Purchase</th>
            <th>News</th>
            <th>Segments</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>
              <td><input type="checkbox" /></td>
              <td>{record.customer}</td>
              <td>{record.lastSeen}</td>
              <td>{record.orders}</td>
              <td>{record.totalSpent}</td>
              <td>{record.latestPurchase}</td>
              <td>{record.news ? 'Yes' : 'No'}</td>
              <td>{record.segments.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;

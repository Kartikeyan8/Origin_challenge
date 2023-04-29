import React, { useState, useEffect } from 'react';
import User from './User';
import './Admin.css';

const Admin = () => {
  const [labels, setLabels] = useState([]);
  const [move, setMove] = useState(false);

  useEffect(() => {
    fetch('/labels.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch labels');
        }
        return response.json();
      })
      .then(data => setLabels(data.labels))
      .catch(error => console.error(error));
  }, []);

  const handleAddLabel = (e) => {
    e.preventDefault();
    const newLabel = e.target.elements.label.value.trim();
    if (newLabel) {
      setLabels([...labels, newLabel]);
      e.target.elements.label.value = '';

      fetch('/labels.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ label: newLabel })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update labels');
          }
        })
        .catch(error => console.error(error));
    }
  };

  const handleDeleteLabel = (labelToDelete) => {
    setLabels(labels.filter((label) => label !== labelToDelete));

    fetch('/labels.json', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ label: labelToDelete })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete label');
        }
      })
      .catch(error => console.error(error));
  };

  const goToNormalDashboard = () => {
    setMove(true);
  };

  return (
    <>
      {move ? (
        <User />
      ) : (
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>
          <p>Manage labels</p>
          <button onClick={goToNormalDashboard}>Normal Dashboard</button>

          <form onSubmit={handleAddLabel}>
            <input type="text" name="label" placeholder="New label" />
            <button>Add Label</button>
          </form>

          {labels && labels.length > 0 ? (
            <ul>
  {labels && labels.map((label, index) => (
    <li key={index}>
      {label}
      <button onClick={() => handleDeleteLabel(label)}>Delete</button>
    </li>
  ))}
</ul>

          ) : (
            <p>No labels found.</p>
          )}

        </div>
      )}
    </>
  );
};

export default Admin;

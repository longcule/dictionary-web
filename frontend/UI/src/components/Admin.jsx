import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const styles = {
    adminContainer: {
      display: 'flex',
    },
    navbar: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      height: '100vh',
      padding: '1rem',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      position: 'fixed'
    },
    title: {
      marginBottom: '1rem',
    },
    button: {
      marginBottom: '0.5rem',
      cursor: 'pointer',
    },
    content: {
      flexGrow: 1,
      padding: '1rem',
    },
  };

  return (
    <div style={styles.adminContainer}>
      <div style={styles.navbar}>
        <h1 style={styles.title}>Web Admin</h1>
        <button style={styles.button} onClick={() => handleNavigate('/admin/manage-accounts')}>Quản lý Account</button>
        <button style={styles.button} onClick={() => handleNavigate('/admin/manage-words')}>Quản lý Words</button>
        <button style={styles.button} onClick={handleLogout}>Đăng Xuất</button>
      </div>
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;

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
      fontFamily: '"Arial", sans-serif', // Font chữ
    },
    navbar: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '300px',
      height: '100vh',
      padding: '1rem',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      position: 'fixed',
      backgroundColor: '#2c3e50', // Màu nền
      color: '#ecf0f1', // Màu chữ
    },
    navItems: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      marginBottom: '1rem',
      textAlign: 'center', // Căn giữa tiêu đề
    },
    button: {
      marginBottom: '0.5rem',
      cursor: 'pointer',
      backgroundColor: '#34495e', // Màu nền nút
      color: '#ecf0f1', // Màu chữ
      border: 'none',
      borderRadius: '5px', // Bo tròn góc
      padding: '10px 15px',
      transition: 'background-color 0.3s', // Hiệu ứng khi hover
    },
    content: {
      flexGrow: 1,
      padding: '1rem',
      marginLeft: '300px',
      backgroundColor: '#ecf0f1', // Màu nền khu vực nội dung
    },
  };

  return (
    <div style={styles.adminContainer}>
      <div style={styles.navbar}>
        <div style={styles.navItems}>
          <h1 style={styles.title}>Web Admin</h1>
          <button style={styles.button} onClick={() => handleNavigate('/admin')}>Quản lý Account</button>
          <button style={styles.button} onClick={() => handleNavigate('/admin')}>Quản lý Words</button>
        </div>
        <button style={styles.button} onClick={handleLogout}>Đăng Xuất</button>
      </div>
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
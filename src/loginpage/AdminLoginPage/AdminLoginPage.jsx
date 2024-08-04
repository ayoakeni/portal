import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/Firebase';
import './AdminLoginPage.css'

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      navigate('/admin-dashboard'); // Change the route as needed
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
    hover: { scale: 1.1, backgroundColor: "#4CAF50", transition: { yoyo: Infinity } }
  };

  return (
    <motion.div
      className="login-staf"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <form onSubmit={handleSubmit}>
        <motion.input
          className='in-staff'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.input 
          className='in-staff'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.button 
          className="input-login"
          type="submit" 
          variants={buttonVariants} 
          initial="hidden" 
          animate="visible"
          whileHover="hover"
        >
          Login
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AdminLoginPage;
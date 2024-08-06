import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/Firebase';
import "../Admin&StaffLoginPage.css"; 

const StaffLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (role === 'staff') {
          console.log('Login successful');
          navigate('/staff-request');
        } else {
          console.error('Error: Unauthorized role');
          setError('Unauthorized access: Staffs only.');
          await signOut(auth);
        }
      } else {
        console.error('Error: No user data found');
        setError('User data not found.');
        await signOut(auth);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.message);
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
      className="login-adminStaff"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <form className='loginForm' onSubmit={handleSubmit}>
        <motion.input
          className='in-adminStaff'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete='email'
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.input 
          className='in-adminStaff'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete='current'
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        />
        {error && <p className="error-message">{error}</p>}
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

export default StaffLoginPage;
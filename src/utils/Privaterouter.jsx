import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './Firebase';
import './PrivateRoute.css'

const PrivateRoute = ({ children, allowedRoles }) => {
  const [user, loading, error] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true); // New state for role loading

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role);
          } else {
            console.error('No such document!');
          }
        } catch (err) {
          console.error('Error fetching user role:', err);
        } finally {
          setRoleLoading(false); // Set role loading to false once done
        }
      } else {
        setRoleLoading(false); // Set role loading to false if no user
      }
    };
    fetchUserRole();
  }, [user]);

  if (loading || roleLoading) {
    return <div className="box"><span class="loader"></span></div>
  }

  if (error) {
    console.error('Error checking authentication state:', error);
    return <div className="box"><span className='error'>Error</span></div>;
  }

  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

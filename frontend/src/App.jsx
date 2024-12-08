import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import ElectionPage from './pages/ElectionPage';
import ElectionResultPage from './pages/ElectionResultPage';
import ManageElectionPage from './pages/ManageElectionPage';

function PrivateRoute({ element, allowedRole }) {
  const { userRole } = useAuth();
  
  console.log('PrivateRoute - Current userRole:', userRole);
  console.log('PrivateRoute - Required role:', allowedRole);

  if (!userRole) {
    console.log('PrivateRoute - No user role, redirecting to home');
    return <Navigate to="/" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    console.log('PrivateRoute - Invalid role, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('PrivateRoute - Access granted');
  return element;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin"
            element={
              <>
                <Navbar />
                <PrivateRoute element={<AdminPage />} allowedRole="admin" />
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
                <Navbar />
                <PrivateRoute element={<UserPage />} allowedRole="user" />
              </>
            }
          />
          <Route
            path="/election/:electionId"
            element={
              <>
                <Navbar />
                <PrivateRoute element={<ElectionPage />} allowedRole="user" />
              </>
            }
          />
          <Route
            path="/election-result/:electionId"
            element={
              <>
                <Navbar />
                <PrivateRoute element={<ElectionResultPage />} />
              </>
            }
          />
          <Route
            path="/manage-election/:electionId"
            element={
              <>
                <Navbar />
                <PrivateRoute element={<ManageElectionPage />} allowedRole="admin" />
              </>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

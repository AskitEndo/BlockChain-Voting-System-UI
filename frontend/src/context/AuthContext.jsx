import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentElections, setCurrentElections] = useState([
    {
      id: 1,
      title: 'Student Council Election 2024',
      status: 'Active',
      totalVotes: 145,
      endDate: '2024-03-25',
      hasVoted: false,
      candidates: [
        {
          name: 'John Smith',
          description: 'Third-year Computer Science student, focused on improving campus technology.'
        },
        {
          name: 'Sarah Johnson',
          description: 'Second-year Business major, advocating for more student events.'
        },
        {
          name: 'Michael Brown',
          description: 'Fourth-year Engineering student, planning to enhance study spaces.'
        }
      ]
    },
    {
      id: 2,
      title: 'Class Representative Election',
      status: 'Active',
      totalVotes: 89,
      endDate: '2024-03-20',
      hasVoted: true,
      candidates: [
        {
          name: 'Candidate 1',
          description: 'Description for Candidate 1'
        },
        {
          name: 'Candidate 2',
          description: 'Description for Candidate 2'
        }
      ]
    },
    // Add election with id: 3 as well
  ]);

  const [completedElections] = useState([
    {
      id: 101,
      title: 'Student Council Election 2023',
      completedDate: 'December 2023',
      totalVotes: 256,
      winner: 'John Smith',
      results: [
        { candidate: 'John Smith', votes: 150 },
        { candidate: 'Jane Doe', votes: 106 },
      ]
    },
    // ... other completed elections
  ]);

  const login = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const value = {
    isAuthenticated,
    userRole,
    login,
    logout,
    currentElections,
    completedElections,
    // ... other functions
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
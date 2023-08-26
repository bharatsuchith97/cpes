import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home/Home';
import EmployeeList from './src/pages/EmployeeList/EmployeeList';
// import ProtectedRoute from './ProtectedRoute';
import LoginPage from './src/pages/LoginPage/LoginPage';
import Sidebar from './src/components/Sidebar/Sidebar';
import { FlexboxContainer, FlexboxItem } from 'ui-components';
import './App.css';
import TeamList from './src/pages/TeamList/TeamList';

function App() {
  // Assume you have a state that holds the role of the current user
  const userString = localStorage.getItem('user');
  const [isLoggedIn, setIsLoggedIn] = useState(userString ? true : false);
  const user = userString ? JSON.parse(userString) : null;

  return (
    <Router>
      <FlexboxContainer justifyContent="flex-start" alignItems="flex-start" style={{ height: "100vh" }} >
        <FlexboxItem>
          {isLoggedIn && <Sidebar user={user} />}
        </FlexboxItem>
        <FlexboxItem className="Full_width">
          <FlexboxContainer flexDirection="column" className="Full_width" justifyContent="center" alignItems="center">
            <FlexboxItem className="App_header Full_width">
              <FlexboxContainer justifyContent="space-between" style={{ height: "40px", marginLeft: "1rem", marginRight: "1rem" }}>
                <FlexboxItem>LiSEC.CPES</FlexboxItem>
                {user && <FlexboxItem className="Logged_in_as">Logged in as: {user?.username}</FlexboxItem>}
              </FlexboxContainer>
            </FlexboxItem>
            <FlexboxItem className="Full_width" padding="1rem">
              <Routes>
                {/* Public route accessible by all */}
                <Route
                  path="/"
                  element={isLoggedIn ? <Home /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
                />
                {/* Protected routes with role-based access control */}
                {['admin','manager'].includes(user?.role) && <Route
                  path="/employees"
                  element={<EmployeeList />}
                />}
                {['admin'].includes(user?.role) && <Route
                  path="/teams"
                  element={<TeamList />}
                />}
              </Routes>
            </FlexboxItem>
          </FlexboxContainer>
        </FlexboxItem>
      </FlexboxContainer>
    </Router>
  );
}

export default App;
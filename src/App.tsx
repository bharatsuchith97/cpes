import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home/Home';
import EmployeeList from './src/pages/EmployeeList/EmployeeList';
// import ProtectedRoute from './ProtectedRoute';
import LoginPage from './src/pages/LoginPage/LoginPage';
import Sidebar from './src/components/Sidebar/Sidebar';
import { FlexboxContainer, FlexboxItem } from 'ui-components';
import './App.css';
import TeamList from './src/pages/TeamList/TeamList';
import TeamLeadList from './src/pages/TeamLeadList/TeamLeadList';

function App() {
  const userString = localStorage.getItem('authDetails');
  const user = userString ? JSON.parse(userString) : null;


  return (
    <Router>
      <FlexboxContainer justifyContent="flex-start" alignItems="flex-start" style={{ height: "100vh", fontFamily: "Roboto" }} >
        <FlexboxItem>
          {user && <Sidebar user={user} />}
        </FlexboxItem>
        <FlexboxItem className="Full_width">
          <FlexboxContainer flexDirection="column" className="Full_width" justifyContent="center" alignItems="center">
            <FlexboxItem className="App_header Full_width">
              <FlexboxContainer justifyContent="space-between" style={{ height: "40px", marginLeft: "1rem", marginRight: "1rem" }}>
                <FlexboxItem className="Header_title">LiSEC.CPES</FlexboxItem>
                {user && <FlexboxItem className="Logged_in_as">Logged in as: <span className="LoggedinUser">{user?.email}</span></FlexboxItem>}
              </FlexboxContainer>
            </FlexboxItem>
            <FlexboxItem className="Full_width" padding="1rem">
              <Routes>
                {/* Public route accessible by all */}
                <Route
                  path="/"
                  element={user ? <Home /> : <LoginPage />}
                />
                {/* Admin Routes */}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Admin" && <Route
                  path="/teams"
                  element={<TeamList />}
                />}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Admin" && <Route
                  path="/employees"
                  element={<EmployeeList />}
                />}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Admin" && <Route
                  path="/teamleads"
                  element={<TeamLeadList />}
                />}
                {/* Team Lead Routes */}
                {/* Employee Routes */}
              </Routes>
            </FlexboxItem>
          </FlexboxContainer>
        </FlexboxItem>
      </FlexboxContainer>
    </Router>
  );
}

export default App;
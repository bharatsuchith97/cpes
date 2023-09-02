import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './src/pages/AdminDashboard/AdminDashboard';
import EmployeeList from './src/pages/EmployeeList/EmployeeList';
// import ProtectedRoute from './ProtectedRoute';
import LoginPage from './src/pages/LoginPage/LoginPage';
import Sidebar from './src/components/Sidebar/Sidebar';
import { FlexboxContainer, FlexboxItem } from 'ui-components';
import './App.css';
import TeamList from './src/pages/TeamList/TeamList';
import TeamLeadList from './src/pages/TeamLeadList/TeamLeadList';
import TeamLeadDashboard from './src/pages/TeamLeadDashboard/TeamLeadDashboard';
import EmployeeDashboard from './src/pages/EmployeeDashboard/EmployeeDashboard';
import EvaluationList from './src/pages/EvaluationList/EvaluationList';
import Employee from './src/pages/Employee/Employee';

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
            <FlexboxItem className="Full_width" padding="1rem" style={{height:"calc(100vh - 42px)",overflow:"auto"}}>
              <Routes>
                {/* Public route accessible by all */}
                <Route
                  path="/"
                  element={!user && <LoginPage />}
                />
                
                {/* Admin Routes */}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Admin") && <Route
                  path="/dashboard"
                  element={<AdminDashboard />}
                />}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Admin") && <Route
                  path="/teams"
                  element={<TeamList />}
                />}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Admin") && <Route
                  path="/employees"
                  element={<EmployeeList />}
                />}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Admin") && <Route
                  path="/teamleads"
                  element={<TeamLeadList />}
                />}
                 {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Admin") && <Route
                  path="evaluations"
                  element={<EvaluationList />}
                />}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Admin") && <Route
                  path="employees/:employeeId"
                  element={<Employee />}
                />}

                {/* Team Lead Routes */}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Manager") && <Route
                  path="/dashboard"
                  element={<TeamLeadDashboard />}
                />}
                  {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Manager") && <Route
                  path="/employees"
                  element={<EmployeeList />}
                />}
                 {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Manager") && <Route
                  path="/evaluations"
                  element={<EvaluationList />}
                />}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Manager") && <Route
                  path="employees/:employeeId"
                  element={<Employee />}
                />}

                {/* Employee Routes */}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Employee" && <Route
                  path="/dashboard"
                  element={<EmployeeDashboard />}
                />}
                {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Employee" && <Route
                  path="/evaluations"
                  element={<EvaluationList />}
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
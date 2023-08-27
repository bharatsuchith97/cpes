import { useState , useEffect } from 'react';
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
  const userString  = localStorage.getItem('authDetails');
  const [isLoggedIn, setIsLoggedIn] = useState(userString ? true : false);
  const user = userString ? JSON.parse(userString) : null;
  let content;
  useEffect(() => {
    handleContent()
  },[userString])
  const handleContent = () => {
    switch (user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
      case 'Employees':
        console.log(user , "userString")
        content = <Route
        path="/employees"
        element={<EmployeeList />}
      />;
        break;
      case 'Admin':
        content = <Route
        path="/teams"
        element={<TeamList />}
        />
        break;
      default : <></>
    }
  }

  console.log(user, "abhijeet")
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
                {user && <FlexboxItem className="Logged_in_as">Logged in as: {user?.email}</FlexboxItem>}
              </FlexboxContainer>
            </FlexboxItem>
            <FlexboxItem className="Full_width" padding="1rem">
              <Routes>
                {/* Public route accessible by all */}
                <Route
                  path="/"
                  element={isLoggedIn ? <Home /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
                />
                {content}
              </Routes>
            </FlexboxItem>
          </FlexboxContainer>
        </FlexboxItem>
      </FlexboxContainer>
    </Router>
  );
}

export default App;
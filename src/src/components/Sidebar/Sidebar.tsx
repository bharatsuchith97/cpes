// Sidebar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexboxContainer, FlexboxItem } from 'ui-components';
import './Sidebar.css';

interface SidebarProps {
    user: {
        username: string;
        role: string;
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" : string;
    };
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
    const navigate = useNavigate();
    const url = new URL( window.location.href);
    const path = url.pathname;
    const logout = () =>{
        localStorage.clear();
        window.location.href="/"
    }
    return (
        <FlexboxContainer flexDirection="column" style={{ width: "200px", backgroundColor: "#871b4c", height: "100vh" }} justifyContent="space-between" alignItems="flex-start">
            <FlexboxItem className="Full_width">
                <FlexboxContainer flexDirection="column" gap="0.313rem" margin="1rem">
                    <FlexboxItem className="Full_width">
                        <FlexboxContainer flexDirection="column" alignItems="flex-start" className="Full_width">
                            {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Admin") && (
                                <>
                                    <FlexboxItem className={path === "/dashboard" ? "MenuItem_active" : "MenuItem"} padding="1rem" onClick={()=>navigate('/dashboard')}>Dashboard</FlexboxItem>
                                    <FlexboxItem className={(path === "/employees" || (path.split('/').length>1 && path.split('/')[1] === "employees")) ? "MenuItem_active" : "MenuItem"} padding="1rem" onClick={()=>navigate('/employees')}>Employees</FlexboxItem>
                                    <FlexboxItem className={path === "/teams" ? "MenuItem_active" : "MenuItem"} padding="1rem" onClick={()=>navigate('/teams')}>Teams</FlexboxItem>
                                    <FlexboxItem className={path === "/teamleads" ? "MenuItem_active" : "MenuItem"} padding="1rem" onClick={()=>navigate('/teamleads')}>Team Leads</FlexboxItem>
                                    <FlexboxItem className={path === "/evaluations" ? "MenuItem_active" : "MenuItem"} padding="1rem" onClick={()=>navigate('/evaluations')}>Evaluations</FlexboxItem>

                                </>
                            )}
                            {
                            user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes("Manager") &&(
                                <>
                                    <FlexboxItem className={path === "/dashboard" ? "MenuItem_active" : "MenuItem"} padding="1rem" onClick={()=>navigate('/dashboard')}>Dashboard</FlexboxItem>
                                    <FlexboxItem className={(path === "/employees" || (path.split('/').length>1 && path.split('/')[1] === "employees")) ? "MenuItem_active" : "MenuItem"} padding="1rem" onClick={()=>navigate('/employees')}>Employees</FlexboxItem>
                                    <FlexboxItem className={path === "/evaluations" ? "MenuItem_active" : "MenuItem"} padding="1rem" onClick={()=>navigate('/evaluations')}>Evaluations</FlexboxItem>
                                </>
                            )}
                            {user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Employee" && (
                                <>
                                    <FlexboxItem className={path === "/dashboard" ? "MenuItem_active" : "MenuItem"} padding="1rem" onClick={()=>navigate('/dashboard')}>Dashboard</FlexboxItem>
                                    {/* <FlexboxItem className={path === "/evaluations" ? "MenuItem_active" : "MenuItem"} padding="1rem" onClick={()=>navigate('/evaluations')}>Evaluations</FlexboxItem> */}
                                </>
                            )}

                        </FlexboxContainer>
                    </FlexboxItem>
                </FlexboxContainer>
            </FlexboxItem>
            <FlexboxItem className="MenuItem_logout" padding="1rem" onClick={()=>logout()}>Logout</FlexboxItem>
        </FlexboxContainer>
    );
};

export default Sidebar;

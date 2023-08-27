// Sidebar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexboxContainer, FlexboxItem } from 'ui-components';
import './Sidebar.css';

interface SidebarProps {
    user: {
        username: string;
        role: string;
    };
}



const Sidebar: React.FC<SidebarProps> = ({ user }) => {
    const navigate = useNavigate();

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
                            {user.role === 'admin' && (
                                <>
                                    <FlexboxItem className="MenuItem" padding="1rem" onClick={()=>navigate('/')}>Admin Dashboard</FlexboxItem>
                                    <FlexboxItem className="MenuItem" padding="1rem" onClick={()=>navigate('/employees')}>Employees</FlexboxItem>
                                    <FlexboxItem className="MenuItem" padding="1rem" onClick={()=>navigate('/teams')}>Teams</FlexboxItem>
                                    <FlexboxItem className="MenuItem" padding="1rem" onClick={()=>navigate('/teamleads')}>Team Leads</FlexboxItem>
                                </>
                            )}
                            {user.role === 'manager' && (
                                <>
                                    <FlexboxItem className="MenuItem" padding="1rem" onClick={()=>navigate('/')}>Home</FlexboxItem>
                                    <FlexboxItem className="MenuItem" padding="1rem" onClick={()=>navigate('/employees')}>Employees</FlexboxItem>
                                </>
                            )}
                            {user.role === 'employee' && (
                                <>
                                    <FlexboxItem className="MenuItem" padding="1rem" onClick={()=>navigate('/')}>Home</FlexboxItem>
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

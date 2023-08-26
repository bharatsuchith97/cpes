// LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexboxContainer, FlexboxItem, Card, TextField, Button } from 'ui-components';
import './LoginPage.css';

interface LoginPageProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
    username: string;
    role: string; // Assuming the role can be 'admin', 'manager', or 'employee'
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username.trim() !== '' && password.trim() !== '') {
            const user: User = {
                username,
                role: '', // Change this role based on your actual login system
            };

            switch (username) {
                case 'admin':
                case 'manager':
                case 'employee':
                    user.role = username;
                    break;
                default:
                    user.role = "employee";
            }

            // Set the login status to true and store the user object in the state
            localStorage.setItem('user', JSON.stringify(user)); // Store the user object in localStorage
            setIsLoggedIn(true);
            navigate('/');
        } else {
            // Show an error message or handle login failure
            alert('Invalid username or password');
        }
    };

    return (
            <Card className="LoginPage_login-card" padding="4rem 4rem">
                <FlexboxContainer flexDirection="column" gap="2rem">
                    <FlexboxItem className="LoginPage_heading">Sign In</FlexboxItem>
                    <FlexboxItem>
                        <FlexboxContainer flexDirection="column" gap="1rem">
                            <FlexboxItem>
                                <TextField
                                    title="Username"
                                    value={username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                />
                            </FlexboxItem>
                            <FlexboxItem>
                                <TextField
                                    title="Password"
                                    value={password}
                                    type="password"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                            </FlexboxItem>
                            <FlexboxItem>
                                <Button
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </FlexboxItem>
                        </FlexboxContainer>
                    </FlexboxItem>
                </FlexboxContainer>
            </Card>
    );
};

export default LoginPage;

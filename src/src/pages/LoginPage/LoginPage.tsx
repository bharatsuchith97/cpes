// LoginPage.tsx
import React, { useState } from 'react';
import { FlexboxContainer, FlexboxItem, Card, TextField, Button } from 'ui-components';
import { loginEmployees } from './redux/loginSlice';
import { useAppDispatch } from '../../../hooks';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username.trim() !== '' && password.trim() !== '') {
            dispatch(loginEmployees({username : username , password : password}))
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

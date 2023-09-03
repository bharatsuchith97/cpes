// LoginPage.tsx
import React, { useEffect, useState } from 'react';
import { FlexboxContainer, FlexboxItem, Card, TextField, Button } from 'ui-components';
import { loginEmployees } from './redux/loginSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import './LoginPage.css';
import { RootState } from '../../../store';

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { isAuthenticated } = useAppSelector((state: RootState) => state.login);

    const handleLogin = () => {
        if (username.trim() !== '' && password.trim() !== '') {
            dispatch(loginEmployees({username : username , password : password}))
        } else {
            // Show an error message or handle login failure
            alert('Invalid username or password');
        }
    };
    useEffect(() => {
        if(isAuthenticated){
            window.location.href='/dashboard';
        }
    }, [isAuthenticated])
    
    
    return (
            <div className="LoginPage_login-card">
                <FlexboxContainer flexDirection="column" gap="2rem">
                <Card style={{backgroundColor:"white",marginTop:"20vh",padding:"3rem",backdropFilter: "blur(10px)",opacity: "0.96"}}>
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

                </FlexboxContainer>
            </div>
    );
};

export default LoginPage;

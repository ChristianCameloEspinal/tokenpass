import React from "react";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";

import { users } from "../../utils/examples";

import * as Styled from '../style/style'




const LoginForm =  ({ onSwitch }: { onSwitch: () => void }) => {

    const { setUser } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("FORM | LOGIN", "Email:", email, "Password:", password);
    
        // Aqui deberías llamar al API de autenticación
        const userData = users.find(
            (user) => user.email === email && user.password === password
        );
    
        if (userData) {
            // Autenticación exitosa
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };
    

    return (
        <>
            <Styled.FrameFloating>
                <Styled.TextSubtitle>Confirm your identity</Styled.TextSubtitle>

                <Styled.Form onSubmit={handleSubmit}>
                    <Styled.InputBox>
                        <Styled.TextBody>Email</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="johndoe@email.com" required></input>
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>
                    <Styled.InputBox>
                        <Styled.TextBody>Password</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" type="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" required></input>
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>
                    <Styled.Button>Log in</Styled.Button>
                </Styled.Form>

                <Styled.Separator></Styled.Separator>

                <Styled.TextSubtitle style={{ textAlign: 'center' }}>Don´t have an account yet?</Styled.TextSubtitle>
                <Styled.TextBody style={{ textAlign: 'center' }}>Register now</Styled.TextBody>
                <Styled.Form>
                    <Styled.Button onClick={onSwitch}>Register</Styled.Button>
                </Styled.Form>

            </Styled.FrameFloating>
        </>
    )
}

export default LoginForm;

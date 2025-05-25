import React from "react";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import * as Styled from '../style/style'
import { loginUser } from "../../service/api";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onSwitch }: { onSwitch: () => void }) => {

    const { login } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const credentials = { email, password };
            const loginResult = await loginUser(credentials);
            console.log(loginResult)
            if (loginResult.success) {
                setError("")
                login(loginResult.data)
                navigate("/");
            }
            else {
                setError("Wrong email | password credentials, try again.")
            }
        }
        catch (error) {
            setError("Unknown error, please contact support.")
        }

    };


    return (
        <>
            <Styled.FrameFloating>
                <Styled.TextSubtitle>Confirm your identity</Styled.TextSubtitle>
                <Styled.TextHint>{error}</Styled.TextHint>
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

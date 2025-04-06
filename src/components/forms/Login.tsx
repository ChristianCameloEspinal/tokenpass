import React from "react";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";

import * as Styled from '../style/style'
import { TextBody, InputField } from './../style/style';



const LoginForm =  ({ onSwitch }: { onSwitch: () => void }) => {

    const { setUser } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Aquí deberías llamar a tu API de autenticación
        // Simulamos un login exitoso:
        const userData = {
            id: 1,
            name: "John Doe",
            email: email,
            password: "",
            dob: "",
            phone: 653252628,
            token: '123',
        };
        setUser(userData); // Guardamos el usuario en el contexto

        // En este punto, el usuario está autenticado, y puedes redirigir o mostrar algo.
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
                                <input type="email" autoComplete="email" placeholder="johndoe@email.com" required></input>
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>
                    <Styled.InputBox>
                        <Styled.TextBody>Password</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input autoComplete="new-password" type="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" required></input>
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

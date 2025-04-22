import React from "react";
import { useState } from "react";

import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";

import * as Styled from '../style/style'
import { FrameHorizontal } from './../style/style';



const RegisterForm = ({ onSwitch }: { onSwitch: () => void }) => {


    const { openModal } = useModal(); // Obtienes la función openModal desde el contexto

    const { setUser } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Aquí deberías llamar a tu API de autenticación
        // Simulamos un login exitoso:
        const userData = {
            id: "1",
            name: "John Doe",
            email: email,
            password: "",
            dob: "",
            phone: "653252628",
            token: '123',
        };

        openModal({
            title: "Confirm your personal information",
            subtitle: "This information could be use to allow you to enter the events that will be performed with the tickets on platform",
            message: "Confirm your name " + userData.name + ", phone number " + userData.phone + "?",
        },
            () => {
                // Esperamos un tick para dejar que el primer modal se cierre
                setTimeout(() => {
                    openModal(
                        {
                            title: "Phone verification",
                            subtitle: "A code has been sent to your number",
                            message: "Please confirm you've received it. (This is a simulation)",
                        },
                        () => {
                            setUser(userData);
                            console.log("User saved!");
                        },
                        () => {
                            console.log("Verification cancelled.");
                        }
                    );
                }, 300); // 300ms funciona bien para que el modal anterior desaparezca
            },
            () => { console.log("Cancelled!"); }
        );

        //setUser(userData); // Guardamos el usuario en el contexto

        // En este punto, el usuario está autenticado, y puedes redirigir o mostrar algo.
    };

    return (<>
            <Styled.FrameFloating>

                <Styled.TextSubtitle>Welcome to TokenPass</Styled.TextSubtitle>

                <Styled.Form onSubmit={handleSubmit}>
                    <Styled.InputBox>
                        <Styled.TextBody>Full name</Styled.TextBody>
                        <Styled.TextHint>Could be need to provide your ID in the entrance of the events*</Styled.TextHint>
                        <Styled.InputField>
                            <Styled.Input>
                                <input type="text" autoComplete="name" placeholder="John Doe" required></input>
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>
                    <Styled.InputBox>
                        <Styled.TextBody>Email</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input type="email" autoComplete="email" placeholder="johndoe@email.com" required></input>
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>
                    <Styled.InputBox>
                        <Styled.TextBody>Phone number</Styled.TextBody>
                        <Styled.TextHint>Your account will be conect to this number*</Styled.TextHint>
                        <Styled.InputField>
                            <Styled.Input>
                                <input type="phone" autoComplete="phone" placeholder="Phone number" required></input>
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
                        <Styled.TextHint>Confirm your password</Styled.TextHint>
                        <Styled.InputField>
                            <Styled.Input>
                                <input autoComplete="new-password" type="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" required></input>
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>
                    <Styled.InputBox>
                        <span className="frame-flex horizontal gap-m">
                            <input type="checkbox" required />
                            <Styled.TextBody>Accept terms and conditions of the platform</Styled.TextBody>
                        </span>
                    </Styled.InputBox>
                    <Styled.FrameHorizontal>
                    <Styled.ButtonAlternate onClick={onSwitch}>Cancel</Styled.ButtonAlternate>
                    <Styled.Button>Register</Styled.Button>
                    </Styled.FrameHorizontal>
                </Styled.Form>
            </Styled.FrameFloating>
        </>
    )
}

export default RegisterForm;

import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";
import { useModalCode } from "../../contexts/ModalCodeContext"
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

import * as Styled from '../style/style'
import { FrameHorizontal } from './../style/style';

import { registerUser, checkUserPhone, validateUserCode } from "../../service/api";

const RegisterForm = ({ onSwitch }: { onSwitch: () => void }) => {
    const { openModal } = useModal();
    const { openModalCode } = useModalCode();
    const { setUser } = useUser();
    const navigate = useNavigate();

    const [userData, setUserData] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationError, setVerificationError] = useState<string>(""); // Estado para el error de verificación

    const handleVerifyCode = async (code: string) => {
        try {
            const validationResponse = await validateUserCode(userData.phone, code);
            if (validationResponse.success) {
                openModal(
                    {
                        title: "Account created succesfully",
                        subtitle: "Do you want to redirect to your dashboard?",
                        message: "",
                    },
                    () => {
                        setUser(userData);
                        localStorage.setItem("user", JSON.stringify(userData));
                        navigate("/");
                    },
                    () => {
                        navigate("/");
                    }
                );
                return true;
            } else {
                setVerificationError(validationResponse.error || "Invalid code. Please try again.");
                return false;
            }
        } catch (error: any) {
            setVerificationError("Network error during validation.");
            return false;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        openModal({
            title: "Confirm your personal information",
            subtitle: "This information could be use to allow you to enter the events that will be performed with the tickets on platform",
            message: `Confirm your name ${userData.fullname}, phone number ${userData.phone}?`,
        },
            async () => {
                try {
                    const hashedPassword = await bcrypt.hash(userData.password, 10);
                    await setUserData(prevUserData => ({ ...prevUserData, password: hashedPassword, confirmPassword: "" }));
                    const registrationResult = await registerUser(userData);

                    if (registrationResult.success) {
                        const checkUserPhoneResult = await checkUserPhone(userData.phone);
                        if (checkUserPhoneResult.success) {
                            setVerificationError(""); // Resetear cualquier error previo
                            openModalCode(
                                {
                                    title: "Phone verification",
                                    subtitle: "A code has been sent to your number",
                                    message: "Please enter the code you received.",
                                },
                                handleVerifyCode,
                                () => {
                                    console.log("Verification cancelled.");
                                }
                            );
                        } else {
                            //openModal({ title: "Error", message: checkUserPhoneResult.error || "Failed to send verification code." });
                        }
                    } else {
                        //penModal({ title: "Error", message: registrationResult.error || "Registration failed" });
                    }
                } catch (error: any) {
                    //openModal({ title: "Error", message: error.message || "An error occurred." });
                } finally {
                    setIsSubmitting(false);
                }
            },
            () => { console.log("Cancelled!"); }
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({ ...prevUserData, [name]: value }));
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
                            <input
                                type="text"
                                autoComplete="name"
                                placeholder="John Doe"
                                value={userData?.name} // Use fullname
                                onChange={handleInputChange}
                                name="name" // Add name prop
                                required
                            />
                        </Styled.Input>
                    </Styled.InputField>
                </Styled.InputBox>
                <Styled.InputBox>
                    <Styled.TextBody>Email</Styled.TextBody>
                    <Styled.InputField>
                        <Styled.Input>
                            <input
                                type="email"
                                autoComplete="email"
                                placeholder="johndoe@email.com"
                                value={userData?.email}
                                onChange={handleInputChange}
                                name="email"  // Add name prop
                                required
                            />
                        </Styled.Input>
                    </Styled.InputField>
                </Styled.InputBox>
                <Styled.InputBox>
                    <Styled.TextBody>Phone number</Styled.TextBody>
                    <Styled.TextHint>Your account will be conect to this number*</Styled.TextHint>
                    <Styled.InputField>
                        <Styled.Input>
                            <input
                                type="phone"
                                autoComplete="phone"
                                placeholder="Phone number"
                                value={userData?.phone}
                                onChange={handleInputChange}
                                name="phone" 
                                required
                            />
                        </Styled.Input>
                    </Styled.InputField>
                </Styled.InputBox>
                <Styled.InputBox>
                    <Styled.TextBody>Date of Birth</Styled.TextBody>
                    <Styled.InputField>
                        <Styled.Input>
                            <input
                                type="date"
                                value={userData?.dob}
                                onChange={handleInputChange}
                                name="dob"
                                required
                            />
                        </Styled.Input>
                    </Styled.InputField>
                </Styled.InputBox>
                <Styled.InputBox>
                    <Styled.TextBody>Password</Styled.TextBody>
                    <Styled.InputField>
                        <Styled.Input>
                            <input
                                autoComplete="new-password"
                                type="password"
                                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                                value={userData?.password}
                                onChange={handleInputChange}
                                name="password" // Add name prop
                                required
                            />
                        </Styled.Input>
                    </Styled.InputField>
                </Styled.InputBox>
                <Styled.InputBox>
                    <Styled.TextBody>Confirm password</Styled.TextBody>
                    <Styled.InputField>
                        <Styled.Input>
                            <input
                                autoComplete="new-password"
                                type="password"
                                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                                value={userData?.confirmPassword}
                                onChange={handleInputChange}
                                name="confirmPassword" // Add name prop
                                required
                            />
                        </Styled.Input>
                    </Styled.InputField>
                </Styled.InputBox>
                <Styled.InputBox>
                    <span className="frame-flex horizontal gap-m">
                        <input
                            type="checkbox"
                            required
                            checked={userData?.acceptTerms}
                            onChange={(e) => setUserData({ ...userData, acceptTerms: e.target.checked })}
                            name="acceptTerms" // Add name prop
                        />
                        <Styled.TextBody>Accept terms and conditions of the platform</Styled.TextBody>
                    </span>
                </Styled.InputBox>
                <Styled.FrameHorizontal>
                    <Styled.ButtonAlternate onClick={onSwitch}>Cancel</Styled.ButtonAlternate>
                    <Styled.Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </Styled.Button>
                </Styled.FrameHorizontal>
            </Styled.Form>
        </Styled.FrameFloating>
    </>)
}

export default RegisterForm;
import React, { useEffect, useState } from "react";
import * as Styled from "../components/style/style";
import { useUser } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import { updateProfile } from "../service/api";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const { user, setUser, logout } = useUser();
    const [userData, setUserData] = useState<any>({});

    const navigator = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [distributor, setDistributor] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.user?.name || "");
            setEmail(user.user?.email || "");
            setPhone(user.user?.phone || "");
            setDistributor(user.user?.distributor || false);
            console.log("USER", user);
        }
    }, [user]);

    const handleLogOut = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            logout();
            navigator('/');
        } catch (error) {
            console.error("Error logging out", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUserData({
            name: name,
            email: email,
            phone: phone,
        });
        try {
            const res = await updateProfile(userData);
            if (res.success) {
                await setUser(res.data.user);
            } else {
                setError("Could not update profile.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        }
    };

    const handleEvents = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try {
            navigator("/events");
        } catch (error) {
            console.error("Error navigating to events", error);
        }   
    }

    const handleRoleChangeRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = true;
            if (res) {
                setError("");
            } else {
                setError("Request could not be sent.");
            }
        } catch {
            setError("Unexpected error. Please try again.");
        }
    };

    return (
        <Styled.Page>
            <Styled.Wrapper>
                <Styled.Title>My Profile</Styled.Title>
                {error && <Styled.TextHint>{error}</Styled.TextHint>}
                <Styled.Form onSubmit={handleSubmit}>
                    <Styled.InputBox>
                        <Styled.TextBody>Name</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="John Doe" required />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.InputBox>
                        <Styled.TextBody>Email</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="you@example.com" required />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.InputBox>
                        <Styled.TextBody>Phone</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+1234567890" required />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.Button>Save Changes</Styled.Button>
                </Styled.Form>

                <Styled.Separator />
                {distributor && <>
                    <Styled.InputBox>
                        <Styled.TextBody>Distributor managment</Styled.TextBody>
                    </Styled.InputBox>

                    <Styled.Form onSubmit={handleEvents}>
                        <Styled.Button>Manage my events</Styled.Button>
                    </Styled.Form></>
                }
                {!distributor && <>
                    <Styled.TextSubtitle style={{ textAlign: "center" }}>Need higher permissions?</Styled.TextSubtitle>
                    <Styled.TextBody style={{ textAlign: "center" }}>You can request to change your role</Styled.TextBody>
                    <Styled.Form onSubmit={() => handleRoleChangeRequest}>
                        <Styled.Button>Request Role Change</Styled.Button>
                    </Styled.Form></>
                }

                <Styled.Separator />

                <Styled.TextBody>Log out from this account</Styled.TextBody>
                <Styled.Form onSubmit={handleLogOut}>
                    <Styled.Button>Log out</Styled.Button>
                </Styled.Form>

            </Styled.Wrapper>
        </Styled.Page>
    );
};

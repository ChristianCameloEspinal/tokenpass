import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

import * as Styled from '../components/style/style';

import LoginForm from "../components/forms/Login"
import RegisterForm from "../components/forms/Register";
import EventLite from "../components/events/EventLite";
import EventFull from '../components/events/EventFull';

import { events } from "../utils/examples";

export default function HomePage() {

    const [state, setState] = useState("login")
    const { user, logout } = useUser();

    if (!user) {
        if (state === "login") {
            return (<>
                <Styled.Page>
                    <button onClick={logout}>Salir</button>
                    <Styled.Wrapper>
                        <Styled.Title>Log in</Styled.Title>
                        <LoginForm onSwitch={() => setState("register")}></LoginForm>
                    </Styled.Wrapper>
                </Styled.Page>
            </>)
        }
        else {
            return (<>
                <Styled.Page>
                    <button onClick={logout}>Salir</button>
                    <Styled.Wrapper>
                        <Styled.Title>Sign up</Styled.Title>
                        <RegisterForm onSwitch={() => setState("login")}></RegisterForm>
                    </Styled.Wrapper>
                </Styled.Page>
            </>)
        }
    }
    else {
        return (<>
            <Styled.Page>
                <button onClick={logout}>Salir</button>
                <Styled.Wrapper>
                    <Styled.Title>Marketplace</Styled.Title>
                    <Styled.FrameVertical>
                        <Styled.TextSubtitle>Featured event</Styled.TextSubtitle>
                        <EventFull
                            data={events[0]}
                        />
                    </Styled.FrameVertical>
                    <Styled.FrameVertical>
                        <Styled.TextSubtitle>Events for you</Styled.TextSubtitle>
                        {events.map((event) => (
                            <EventLite
                                key={event.id}
                                data={event}
                            />
                        ))}
                    </Styled.FrameVertical>
                </Styled.Wrapper>
            </Styled.Page>
        </>)
    }
}

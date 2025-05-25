import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import * as Styled from '../components/style/style';

import LoginForm from "../components/forms/Login"
import RegisterForm from "../components/forms/Register";
import EventLite from "../components/events/EventLite";
import EventFull from '../components/events/EventFull';
import { getEvents } from "../service/api";
import { EventType } from "../utils/types";

export default function HomePage() {

    const [state, setState] = useState("login")
    const { user, logout } = useUser();
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                console.log(response)
                setEvents(response.data.events);
                console.log(events)
            } catch (error) {
                console.error("Error fetching events", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchEvents();
        }
        
    }, [user]);


    if (!user) {
        if (state === "login") {
            return (<>
                <Styled.Page>
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
                    <Styled.Wrapper>
                        <Styled.Title>Sign up</Styled.Title>
                        <RegisterForm onSwitch={() => setState("login")}></RegisterForm>
                    </Styled.Wrapper>
                </Styled.Page>
            </>)
        }
    }
    else {

        if (loading) {
            return (<>
                <Styled.Page>
                    <Styled.Wrapper>
                        <Styled.Title>Loading events...</Styled.Title>
                    </Styled.Wrapper>
                </Styled.Page>
            </>);
        }
        else {
            return (<>
                <Styled.Page>
                    <Styled.Wrapper>
                        <Styled.Title>Marketplace</Styled.Title>
                        <Styled.FrameVertical>
                            <Styled.TextSubtitle>Featured event</Styled.TextSubtitle>
                            {events.length > 0 && <EventFull data={events[0]} />}
                        </Styled.FrameVertical>
                        <Styled.FrameVertical style={{ gap: "10px" }}>
                            <Styled.TextSubtitle>Events for you</Styled.TextSubtitle>
                            {Array.isArray(events) && events.map((event) => (
                                <EventLite key={event.id} data={event} />
                            ))}
                        </Styled.FrameVertical>
                    </Styled.Wrapper>
                </Styled.Page>
            </>)
        }

    }
}

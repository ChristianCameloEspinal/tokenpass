import React, { useEffect, useState } from "react";
import * as Styled from "../components/style/style";
import { useUser } from "../contexts/UserContext";
import { getOrganizerEvents } from "../service/api";
import { formatDateToDDMMYYYY } from "../utils/blockchainUtils";
import { useNavigate } from "react-router-dom";

type EventType = {
    id: number;
    eventName: string;
    eventDate: string;
    type: string;
    location: string;
    image: string;
    eventDescription: string;
};

export default function EventsPage() {
    const { user } = useUser();
    const [events, setEvents] = useState<EventType[]>([]);
    const navigator = useNavigate(); 
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await getOrganizerEvents();
                setEvents(res.data.events);
            } catch (error) {
                console.error("Failed to fetch organizer events", error);
            }
        };

        if (user?.user.distributor) fetchEvents();
    }, [user]);

    const handleNewEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        navigator("/events/create");
    };

    const handleValidate = async (e: React.FormEvent, id:number) => {
        e.preventDefault();
        navigator(`/events/validate/${id}`);
    }

    const handleSales = async (e: React.FormEvent, id:number) => {
        e.preventDefault();
        navigator(`/events/sales/${id}`);
    }

    if (!user?.user.distributor) {
        return (
            <Styled.Page>
                <Styled.Wrapper>
                    <Styled.TextSubtitle>You do not have access to this page.</Styled.TextSubtitle>
                </Styled.Wrapper>
            </Styled.Page>
        );
    }

    return (
        <Styled.Page>
            <Styled.Wrapper>
                <Styled.Title>My Organized Events</Styled.Title>
                <Styled.Form onSubmit={handleNewEvent}>
                    <Styled.Button>Create a new event</Styled.Button>
                </Styled.Form>
                <Styled.FrameVertical style={{ gap: "10px" }}>
                    {events.map((event) => (
                        <Styled.TicketFrame key={event.id}>
                            <Styled.FrameHorizontalPadd>
                                <Styled.FrameVertical>
                                    <Styled.TextHint>{formatDateToDDMMYYYY(event.eventDate)}</Styled.TextHint>
                                    <Styled.TextSubtitle>{event.eventName}</Styled.TextSubtitle>
                                    <Styled.TextLink>{event.location}</Styled.TextLink>
                                </Styled.FrameVertical>
                                <Styled.FrameVertical style={{ textAlign: "right" }}>
                                    <Styled.TextHint>{event.type}</Styled.TextHint>
                                </Styled.FrameVertical>
                            </Styled.FrameHorizontalPadd>
                            <Styled.FrameHorizontalPadd>
                                <Styled.ButtonAlternate onClick={(e) => handleValidate(e,event.id)}>Validate Ticket</Styled.ButtonAlternate>
                                <Styled.ButtonAlternate onClick={(e) => handleSales(e,event.id)}>View Sales</Styled.ButtonAlternate>
                            </Styled.FrameHorizontalPadd>
                        </Styled.TicketFrame>
                    ))}
                </Styled.FrameVertical>
            </Styled.Wrapper>
        </Styled.Page>
    );
}

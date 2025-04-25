import React from "react";
import * as Styled from '../components/style/style';
import { events, tickets } from "../utils/examples";
import { useUser } from "../contexts/UserContext";

export default function TicketsPage() {

    const { user } = useUser();

    const userTickets = tickets.filter((ticket) => ticket.owner === user?.id);
    
    console.log("PAGE | TICKETS", "tickets no details", userTickets);
    
    const userTicketsWithDetails = userTickets.map((ticket) => {
        const event = events.find((event) => event.id === ticket.event);
        return {
            ...ticket,
            eventName: event?.eventName,
            eventDate: event?.eventDate,
            location: event?.location,
            type: event?.type,
        };
    });
    



    return (
        <>
            <Styled.Page>
                <Styled.Wrapper>
                    <Styled.Title>My Tickets</Styled.Title>
                    <Styled.FrameVertical style={{ gap: "10px" }}>
                        <Styled.TextSubtitle>Events for you</Styled.TextSubtitle>
                        {userTicketsWithDetails && userTicketsWithDetails.map((ticket) => (
                            <Styled.TicketFrame
                                key={ticket.id}
                            >
                                <Styled.FrameHorizontalPadd>
                                    <Styled.FrameVertical>
                                        <Styled.TextHint>{ticket.eventDate}</Styled.TextHint>
                                        <Styled.TextSubtitle>{ticket.eventName}</Styled.TextSubtitle>
                                        <Styled.TextLink>{ticket.location}</Styled.TextLink>
                                    </Styled.FrameVertical>
                                    <Styled.FrameVertical style={{ textAlign: "right" }}>
                                        <Styled.TextHint>{ticket.type}</Styled.TextHint>
                                        <Styled.Button>Validate</Styled.Button>
                                        <Styled.Button>Resell</Styled.Button>
                                    </Styled.FrameVertical>
                                </Styled.FrameHorizontalPadd>

                            </Styled.TicketFrame>
                        ))}
                    </Styled.FrameVertical>
                </Styled.Wrapper>
            </Styled.Page>
        </>
    )
}
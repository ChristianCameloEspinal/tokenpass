import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "../contexts/UserContext";
import * as Styled from '../components/style/style';

import { EventType } from "../utils/types";
import { events } from "../utils/examples";
import { useEvent } from './../contexts/EventContext';

export default function EventPage() {

    const { event, setEvent } = useEvent();
    const { id } = useParams();
    const [eventData, setEventData] = useState<EventType | null>(null);

    useEffect(() => {
        const foundEvent = events.find((event) => event.id === Number(id));

        if (foundEvent) {
            setEvent(foundEvent); // Seteás el evento completo al contexto
            setEventData(foundEvent);
        }
    }, [id]);

    if (!eventData) {
        return <div>Loading or Event not found...</div>; // Aquí puedes reemplazarlo con un loader o algo más visual
    }

    const { eventName, eventDate, location, type, lastPrice, currentPrice, eventDescription } = eventData;

    return (
        <Styled.Page>
            <Styled.Wrapper>
                <a href='/'>
                    <Styled.ButtonSmall>
                        Back
                    </Styled.ButtonSmall>
                </a>
                <Styled.Title>{eventName}</Styled.Title>
                <Styled.EventPhoto src="https://picsum.photos/300" alt="Foto del evento" />
                <Styled.FrameVerticalMain>
                    <Styled.FrameHorizontal>
                        <Styled.FrameVertical>
                            <Styled.TextHint>{eventDate}</Styled.TextHint>
                            <Styled.TextSubtitle>{eventName}</Styled.TextSubtitle>
                            <Styled.TextLink>{location}</Styled.TextLink>
                        </Styled.FrameVertical>
                        <Styled.FrameVertical style={{ textAlign: "right" }}>
                            <Styled.TextHint>{type}</Styled.TextHint>
                            <Styled.TextHint>Last price ${lastPrice.toFixed(2)}</Styled.TextHint>
                            <Styled.TextSubtitle>${currentPrice.toFixed(2)}</Styled.TextSubtitle>
                        </Styled.FrameVertical>
                    </Styled.FrameHorizontal>
                    <Styled.FrameVertical>
                        <Styled.TextSubtitle>Details</Styled.TextSubtitle>
                        <Styled.TextBody>{eventDescription}</Styled.TextBody>
                    </Styled.FrameVertical>
                </Styled.FrameVerticalMain>
            </Styled.Wrapper>
        </Styled.Page>
    );
}

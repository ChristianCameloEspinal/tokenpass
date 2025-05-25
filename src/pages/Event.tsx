import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "../contexts/UserContext";
import * as Styled from '../components/style/style';

import { EventType } from "../utils/types";
import { getEventById } from "../service/api";

export default function EventPage() {

    const { id } = useParams();
    const [eventData, setEventData] = useState<EventType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchEvent = async () => {
                try {
                    const response = await getEventById(id);
                    //console.log(response)
                    if (response.success) {
                        setEventData(response.data.event); // Asegúrate de actualizar eventData con los datos correctos
                    } else {
                        console.error('Error fetching event:', response.error);
                    }
                } catch (error) {
                    console.error("Error fetching events", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchEvent();
        }
    }, [id]);

    if (loading) {
        return (
            <Styled.Page>
                <Styled.Wrapper>
                    <a href='/'>
                        <Styled.ButtonSmall>
                            Back
                        </Styled.ButtonSmall>
                    </a>
                    <Styled.Title>Loading event...</Styled.Title>
                </Styled.Wrapper>
            </Styled.Page>
        );
    }

    if (!eventData) {
        return (
            <Styled.Page>
                <Styled.Wrapper>
                    <Styled.Title>Event not found</Styled.Title>
                </Styled.Wrapper>
            </Styled.Page>
        );
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

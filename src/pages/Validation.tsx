import React, { useEffect, useState } from "react";
import * as Styled from '../components/style/style';
import { useUser } from "../contexts/UserContext";
import { QRCodeSVG } from 'qrcode.react';
import { useParams, useLocation } from "react-router-dom";
import { EventType } from "../utils/types";
import { getEventById, getQR } from "../service/api";

export default function ValidationPage() {

    const { user } = useUser();
    const { eventParam } = useParams();
    const location = useLocation();

    const qrValue = location.state?.qrCode ?? "No QR code found";

    const [eventData, setEventData] = useState<EventType | null>(null);

    useEffect(() => {
        if (eventParam) {
            const fecthQR = async () => {
                try {
                    const response = await getQR(eventParam);
                    if (response.success) {
                        setEventData(response.data.event);
                    } else {
                        console.error('Error fetching event:', response.error);
                    }
                }
                catch (error) {
                    console.error("Error fetching events", error);
                } finally {
                    //setLoading(false);
                }
            }
            fecthQR();
            const fetchEvent = async () => {
                try {
                    const response = await getEventById(eventParam);
                    if (response.success) {
                        setEventData(response.data.event);
                    } else {
                        console.error('Error fetching event:', response.error);
                    }
                } catch (error) {
                    console.error("Error fetching events", error);
                } finally {
                    //setLoading(false);
                }
            };
            fetchEvent();
        }
    }, [eventParam]);

    if (!eventData) {
        return (
            <Styled.Page>
                <Styled.Wrapper>
                    <Styled.Title>Event not found</Styled.Title>
                    <p>The event you are looking for does not exist.</p>
                </Styled.Wrapper>
            </Styled.Page>
        );
    }

    return (
        <Styled.Page>
            <Styled.Wrapper>
                <Styled.Title>Validate your ticket</Styled.Title>

                <Styled.FrameVerticalMain>
                    <Styled.FrameHorizontal>
                        <Styled.FrameVertical>
                            <Styled.TextHint>{eventData.eventDate}</Styled.TextHint>
                            <Styled.TextSubtitle>{eventData.eventName}</Styled.TextSubtitle>
                            <Styled.TextLink>{eventData.location}</Styled.TextLink>
                        </Styled.FrameVertical>
                        <Styled.FrameVertical style={{ textAlign: "right" }}>
                            <Styled.TextHint>{eventData.type}</Styled.TextHint>
                        </Styled.FrameVertical>
                    </Styled.FrameHorizontal>
                </Styled.FrameVerticalMain>

                <Styled.FrameVerticalMain>
                    <Styled.TextHint>Scan the QR code to validate your ticket</Styled.TextHint>
                    <QRCodeSVG
                        style={{ margin: "0 auto" }}
                        value={qrValue}
                        size={256}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin={true}
                    />
                </Styled.FrameVerticalMain>
            </Styled.Wrapper>
        </Styled.Page>
    );
}

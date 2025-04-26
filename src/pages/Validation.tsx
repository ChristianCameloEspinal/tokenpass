import React, { useEffect, useState } from "react";
import * as Styled from '../components/style/style';
import { useUser } from "../contexts/UserContext";
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { events } from "../utils/examples";
import { EventType } from "../utils/types";

/**
 * Aquí se debe leer el ticket JWT de identificación del ticket para ser validado en el evento
 * y se debe mostrar el QR con el ticket.
 * @returns Validation page
 */

export default function ValidationPage() {

    const { user } = useUser();
    const { eventParam } = useParams();

    const location = useLocation();
    const qrValue = location.state?.qrCode || "No QR code found";

    const [eventData, setEventData] = useState<EventType | null>(null);

    useEffect(() => {
        const foundEvent = events.find((event) => event.id === Number(eventParam));
        if (foundEvent) {
            setEventData(foundEvent);
        }
        console.log("PAGE | Validation","param",eventParam)
    }, [eventParam]);

    return (<>
        <Styled.Page>
            <Styled.Wrapper>
                <Styled.Title>Validate your ticket</Styled.Title>
                <Styled.FrameVerticalMain>
                    <Styled.FrameHorizontal>
                        <Styled.FrameVertical>
                            <Styled.TextHint>{eventData?.eventDate}</Styled.TextHint>
                            <Styled.TextSubtitle>{eventData?.eventName}</Styled.TextSubtitle>
                            <Styled.TextLink>{eventData?.location}</Styled.TextLink>
                        </Styled.FrameVertical>
                        <Styled.FrameVertical style={{ textAlign: "right" }}>
                            <Styled.TextHint>{eventData?.type}</Styled.TextHint>
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
    </>)
}
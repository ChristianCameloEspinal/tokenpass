import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BarcodeScanner from "react-qr-barcode-scanner";
import * as Styled from "../components/style/style";
import { getEventById, validateTicket } from "../service/api";
import { EventType } from "../utils/types";
import { formatDateToDDMMYYYY } from "../utils/blockchainUtils";

export default function ValidateTicketPage() {

    const { id } = useParams();
    const [data, setData] = useState("Not Found");
    const [ticketInfo, setTicketInfo] = useState<any>(null);
    const [validationStatus, setValidationStatus] = useState<string | null>(null);
    const [eventData, setEventData] = useState<EventType | null>(null);

    useEffect(() => {
        if (id) {
            const fetchEvent = async () => {
                try {
                    const response = await getEventById(id);

                    if (response.success) {
                        setEventData(response.data.event);
                    } else {
                        console.error('Error fetching event:', response.error);
                    }
                } catch (error) {
                    console.error("Error fetching events", error);
                }
            };
            fetchEvent();
        }
    }, [id]);

    const handleError = (err: any) => {
        console.error("QR scan error", err);
        setValidationStatus("Error al escanear QR");
    };

    const confirmValidation = async () => {
        if (!ticketInfo) return;

        const res = await validateTicket(ticketInfo);
        if (res.success) {
            setValidationStatus("✅ Ticket validado correctamente");
        } else {
            setValidationStatus(`❌ Error: ${res.error}`);
        }
    };

    return (
        <Styled.Page>
            <Styled.Wrapper>
                <Styled.Title>Validate Ticket</Styled.Title>

                {eventData && <Styled.TicketFrame>
                    <Styled.FrameHorizontalPadd>
                        <Styled.FrameVertical>
                            <Styled.TextHint>{formatDateToDDMMYYYY(eventData.eventDate)}</Styled.TextHint>
                            <Styled.TextSubtitle>{eventData.eventName}</Styled.TextSubtitle>
                            <Styled.TextLink>{eventData.location}</Styled.TextLink>
                        </Styled.FrameVertical>
                        <Styled.FrameVertical style={{ textAlign: "right" }}>
                            <Styled.TextHint>{eventData.type}</Styled.TextHint>
                        </Styled.FrameVertical>
                    </Styled.FrameHorizontalPadd>
                </Styled.TicketFrame>}

                <Styled.FrameVertical className="gap-m" style={{ marginTop: "20px" }}>
                    <Styled.TextHint>Scan the QR Code of the customer</Styled.TextHint>
                    <div className="border-simple" style={{borderRadius:"0.5em"}}><BarcodeScanner
                        onUpdate={(err, result: any) => {
                            if (result) setData(result.text);
                            else setData("Not Found");
                        }}
                    /></div>
                </Styled.FrameVertical>

                {ticketInfo && (
                    <Styled.FrameVertical style={{ marginTop: "20px" }}>
                        <Styled.TextBody>Ticket ID: {ticketInfo.tokenId}</Styled.TextBody>
                        <Styled.TextHint>Nonce: {ticketInfo.nonce}</Styled.TextHint>
                        <Styled.TextHint>Expire: {new Date(ticketInfo.expiration * 1000).toLocaleString()}</Styled.TextHint>

                        <Styled.Button onClick={confirmValidation}>
                            Confirm
                        </Styled.Button>
                    </Styled.FrameVertical>
                )}


                {validationStatus && (
                    <Styled.TextHint style={{ marginTop: "15px" }}>
                        {validationStatus}
                    </Styled.TextHint>
                )}
            </Styled.Wrapper>
        </Styled.Page>
    );
}

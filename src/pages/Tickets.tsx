import React, { useEffect, useState } from "react";
import * as Styled from '../components/style/style';
import { useUser } from "../contexts/UserContext";
import { useModalCode } from "../contexts/ModalCodeContext";
import { useModal } from "../contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import { TicketType } from "../utils/types";
import { getTickets, getEventById, listTicket, unlistTicket } from "../service/api";
import { formatDateToDDMMYYYY } from "../utils/blockchainUtils";

export default function TicketsPage() {
    const { user } = useUser();
    const { openModalCode } = useModalCode();
    const { openModal } = useModal();
    const navigate = useNavigate();

    const [userTickets, setUserTickets] = useState<TicketType[]>([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await getTickets();
                const tickets = response.data.tickets;

                const userTicketsWithDetails = await Promise.all(
                    tickets.map(async (ticket: any) => {
                        const eventData = await getEventById(ticket?.event);
                        return {
                            ...ticket,
                            eventName: eventData.data.event.eventName,
                            eventDate: eventData.data.event.eventDate,
                            location: eventData.data.event.location,
                            type: eventData.data.event.type,
                            image: eventData.data.event.image,
                            eventDescription: eventData.data.event.eventDescription,
                        };
                    })
                );

                setUserTickets(userTicketsWithDetails);
            } catch (error) {
                console.error("Error fetching tickets", error);
            }
        };

        if (user) fetchTickets();
    }, [user]);

    const handleVerifyCode = async (code: string, ticketId: number) => {
        try {
            if (user) {
                const response = await unlistTicket(ticketId, code);
                if(response)
                navigate(`/tickets`);
            }
            return true;
        } catch (error) {
            console.log("Unable to verify code", error);
            return false;
        }
    };

    const handleUnlist = (ticketId: number) => {
        openModal(
            {
                title: "Set the ticket to unable to purchase",
                subtitle: "Do you want to proceed?",
                message: "",
            },
            () => {
                const doVerification = async () => {
                    const checkUserPhoneResult = true;
                    if (checkUserPhoneResult) {
                        openModalCode(
                            {
                                title: "Phone verification",
                                subtitle: "Enter the code sent to your number",
                                message: "We’ve sent you a code, please type it below",
                            },
                            (code) => handleVerifyCode(code, ticketId),
                            () => {
                                console.log("Verification cancelled.");
                            }
                        );
                    }
                };
                doVerification();
            },
            () => {
                console.log("Validation cancelled.");
            }
        );
    };

    function handleSell(id: any): void {
        navigate(`/sell/${id}`);
    }

    function handleQR(eventParam: any): void {
        navigate(`/validate/${eventParam}`);
    }

    return (
        <Styled.Page>
            <Styled.Wrapper>
                <Styled.Title>My Tickets</Styled.Title>
                <Styled.FrameVertical style={{ gap: "10px" }}>
                    <Styled.TextSubtitle>Your tickets</Styled.TextSubtitle>
                    {userTickets.map((ticket) => (
                        <Styled.TicketFrame key={ticket?.tokenId}>
                            <Styled.FrameHorizontalPadd>
                                <Styled.FrameVertical>
                                    <Styled.TextHint>Ticket UUID {ticket?.tokenId}</Styled.TextHint>
                                    <Styled.TextHint>{formatDateToDDMMYYYY(ticket?.eventDate)}</Styled.TextHint>
                                    <Styled.TextSubtitle>{ticket?.eventName}</Styled.TextSubtitle>
                                    <Styled.TextLink>{ticket?.location}</Styled.TextLink>
                                </Styled.FrameVertical>
                                <Styled.FrameVertical style={{ textAlign: "right" }}>
                                    <Styled.TextHint>{ticket?.type}</Styled.TextHint>
                                    <Styled.TextHint>
                                        {ticket?.forSale ? "Listed for purchase" : "Unlisted"}
                                    </Styled.TextHint>
                                </Styled.FrameVertical>
                            </Styled.FrameHorizontalPadd>

                            <Styled.FrameHorizontalPadd>
                                <Styled.Button onClick={() => handleQR(ticket?.event)}>Validate</Styled.Button>

                                {!ticket?.forSale && (
                                    <Styled.ButtonAlternate onClick={() => handleSell(ticket?.event)}>Resell</Styled.ButtonAlternate>
                                )}
                                {ticket?.forSale && (
                                    <Styled.ButtonAlternate onClick={() => handleUnlist(ticket.tokenId)}>Cancel Sell</Styled.ButtonAlternate>
                                )}
                            </Styled.FrameHorizontalPadd>
                        </Styled.TicketFrame>
                    ))}
                </Styled.FrameVertical>
            </Styled.Wrapper>
        </Styled.Page>
    );
}

import React from "react";
import * as Styled from '../components/style/style';
import { events, tickets } from "../utils/examples";
import { useUser } from "../contexts/UserContext";
import { useModalCode } from "../contexts/ModalCodeContext";
import { useModal } from "../contexts/ModalContext";
import { useNavigate } from "react-router-dom";

export default function TicketsPage() {

    const { user } = useUser();
    const { openModalCode } = useModalCode();
    const { openModal } = useModal();
    const navigate = useNavigate();

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

    const handleValidate = (ticketId: number, eventId:number) => {
        /**
         * El backend envía un código SMS al número de teléfono del usuario que es el generatedCode
         * y el ticketId es el id del ticket que se va a validar.
         */
        const generatedCode = "code123"
        openModalCode({
            title: "Confirm your identity",
            subtitle: "We sent you a message to your phone number to check your identity",
            message: "Please confirm with the number sent to you",
        }, generatedCode
            , () => {
                console.log("Ticket validated:", ticketId);
                /**
                 * El frontend NO muestra el QR directamente.
                    Cuando el usuario hace clic en el ticket:
                        Se le envía un código SMS (como ya estás haciendo).
                        Al ingresar el código, el frontend hace una solicitud al backend seguro (con auth).
                        Que el usuario está autenticado (token de sesión o wallet conectada).
                        Que es dueño del ticket (usando Web3 para leer el owner del token).
                        Que el ticket no ha sido usado (tu backend o contrato pueden llevar ese estado).
                    Si todo es válido, el backend genera un JWT temporal firmado (o código único) que contiene:
                        ticketId
                        walletAddress
                        timestamp
                        hash o firma
                    El frontend recibe este token y lo convierte en QR.
                    En el evento, el QR se escanea y se verifica contra el backend o contrato.
                 */
                const qrCode = JSON.stringify({
                    ticketId,
                    walletAddress: user?.id,
                    timestamp: new Date().toISOString(),
                    hash: generatedCode,
                });
                navigate(`/validate/${eventId}`, { state: { qrCode } });
                
            }, () => {
                console.log("Validation cancelled.");
            });
    }

    function handleSell(id: number): void {
        navigate(`/sell/${id}`);
    }

    function handleCancelSell(id: number): void {
        openModal({
            title: "Cancel sell",
            subtitle: "Are you sure you want to cancel the sale?",
            message: "You will be able to sell it again later.",
        }, () => {
            console.log("Ticket sale cancelled:", id);
            // Aquí iría la lógica para cancelar la venta del ticket
        }
            , () => {
                console.log("Cancel sale cancelled.");
            }
        );
    }

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
                                        <Styled.Button onClick={() => handleValidate(ticket.id, ticket.event)}>Validate</Styled.Button>

                                    {ticket.listed === false && <Styled.ButtonAlternate onClick={() => handleSell(ticket.id)}>Resell</Styled.ButtonAlternate>}
                                    {ticket.listed === true && <Styled.ButtonAlternate onClick={() => handleCancelSell(ticket.id)}>Cancel Sell</Styled.ButtonAlternate>}  

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
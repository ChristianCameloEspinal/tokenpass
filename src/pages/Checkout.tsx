import React from "react";

import PaymentForm from "../components/forms/Payment";
import { BlockchainAPI } from "../service/blockchainFacade";
import { useUser } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";

import * as Styled from '../components/style/style';
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {

    const { state } = useLocation();
    const { user } = useUser();
    const navigate = useNavigate();
    const openModal = useModal().openModal;

    const {
        eventId,
        ticketId,
        seller,
        quantity,
        unitPrice,
        total
    } = state || {};

    const handlePayment = (paymentInfo: {
        cardNumber: string;
        name: string;
        expiry: string;
        cvv: string;
    }) => {

        openModal({
            title: "Procede to payment",
            subtitle: "Do you want to proceed with the payment?",
            message: "We are going to charge you $" + total + " for " + quantity + " tickets"
        },
            () => {
                const finalPurchaseData = {
                    eventId,
                    ticketId,
                    seller,
                    quantity,
                    unitPrice,
                    total,
                    paymentInfo,
                    user
                };

                //Aquí llamo a la funcionalidad encargada de hacer la transacción del NFT de un usuario a otro ( dueño anterior -> comprador )

                if (user) {
                    BlockchainAPI.purchaseTicket(ticketId, user.id).then((response) => {
                        console.log("PAGE | CHECKOUT","Payment complete "+ finalPurchaseData);
                        navigate(`/tickets`);
                    })
                }
                else {
                    console.log("PAGE | CHECKOUT", "Unable to purchase");
                    // El usuario no esta logueado
                }
            },
            () => {
                console.log("PAGE | CHECKOUT", "Payment cancelled.");
            }
        );

        //alert("Payment successful! Check console for details.");
    };

    return (<>
        <Styled.Page>
            <Styled.Wrapper>
                <a href='/'>
                    <Styled.ButtonSmall>
                        Back
                    </Styled.ButtonSmall>
                </a>

                <Styled.FrameVertical>
                    <Styled.Title>Complete the checkout</Styled.Title>

                    <Styled.TextSubtitle>Your items</Styled.TextSubtitle>


                    <PaymentForm onConfirm={handlePayment}></PaymentForm>
                </Styled.FrameVertical>
            </Styled.Wrapper>
        </Styled.Page>

    </>)
}

import { useEffect, useState } from "react";
import PaymentForm from "../components/forms/Payment";
import { purchaseTickets, estimateGas } from "../service/api";
import { useUser } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import { useModalCode } from "../contexts/ModalCodeContext";
import * as Styled from '../components/style/style';
import { useLocation, useNavigate } from "react-router-dom";
import { ethToUsd, weiToUsd } from "../utils/blockchainUtils";
import { ethers } from 'ethers';

export default function CheckoutPage() {
    const { state } = useLocation();
    const { user } = useUser();
    const [error, setError] = useState("");
    const [gasInfo, setGasInfo] = useState("");
    const navigate = useNavigate();
    const openModal = useModal().openModal;
    const openModalCode = useModalCode().openModalCode;

    const {
        ticketId,
        seller,
        paymentInfo,
        total
    } = state || {};

    const fetchGas = async () => {
        if (!ticketId) return;
        try {
            const resp = await estimateGas(
                "buyTicket",
                [ticketId],
                total
            );
            console.log(resp)
            setGasInfo(resp.data.gasPrice);
        } catch (err: any) {
            console.error("Error estimating gas", err);
            setError("Unable to estimate gas fee");
        }
    };

    useEffect(() => {
        fetchGas();
    }, [ticketId]);

    const handleVerifyCode = async (code: string) => {
        try {
            if (user) {
                const response = await purchaseTickets(ticketId, code);
                console.log("VERIFICACION DE CODIGO", response);
                navigate(`/tickets`);
            }
            return true;
        } catch (error: any) {
            console.log("Unable to verify code", error);
            return false;
        }
    };

    const handlePayment = (paymentInfo: {
        cardNumber: string;
        name: string;
        expiry: string;
        cvv: string;
    }) => {

        if (gasInfo === "") {
            setGasInfo("Getting gas fee, please wait");
            return;
        }

        console.log("PAYING");

        openModal(
            {
                title: "Proceed to payment",
                subtitle: "Do you want to proceed?",
                message: `We will charge you a total of ${total} USD`,
            },
            () => {
                const doVerification = async () => {
                    const checkUserPhoneResult = true; // await checkUserPhone();
                    if (checkUserPhoneResult) {
                        openModalCode(
                            {
                                title: "Phone verification",
                                subtitle: "Enter the code sent to your number",
                                message: "We’ve sent you a code, please type it below",
                            },
                            handleVerifyCode,
                            () => {
                                console.log("Verification cancelled.");
                            }
                        );
                    }
                };
                doVerification();
            },
            () => {
                //console.log("PAGE | CHECKOUT", "Payment cancelled.");
            }
        );
    };

    const gasUsd = gasInfo ? weiToUsd(ethers.parseUnits(gasInfo, "gwei")) : 0;
    const ticketPrice = weiToUsd(total) || 0;
    const totalPrice = gasUsd + ticketPrice;
    return (
        <Styled.Page>
            <Styled.Wrapper>
                <a href='/'>
                    <Styled.ButtonSmall>Back</Styled.ButtonSmall>
                </a>

                <Styled.FrameVertical>
                    <Styled.Title>Complete the checkout</Styled.Title>

                    <Styled.TextSubtitle>Your items</Styled.TextSubtitle>

                    <Styled.FrameHorizontal style={{ marginTop: 50 }}>
                        <Styled.TextBody>Identification code of Ticket</Styled.TextBody>
                        <Styled.TextBody>{ticketId}</Styled.TextBody>
                    </Styled.FrameHorizontal>
                    <Styled.FrameHorizontal>
                        <Styled.TextBody>Transaction Fee</Styled.TextBody>
                        <Styled.TextBody>
                            {gasInfo && weiToUsd(ethers.parseUnits(gasInfo, "gwei")).toFixed(5)} USD
                        </Styled.TextBody>
                    </Styled.FrameHorizontal>
                    <Styled.FrameHorizontal style={{ marginBottom: 50 }}>
                        <Styled.TextBody>Ticket Price</Styled.TextBody>
                        <Styled.TextBody>{weiToUsd(total)} USD</Styled.TextBody>
                    </Styled.FrameHorizontal>
                    <Styled.Separator></Styled.Separator>

                    <Styled.FrameHorizontal style={{ marginBottom: 50 }}>
                        <Styled.TextBody>Total Price</Styled.TextBody>
                        <Styled.TextBody>{totalPrice.toFixed(5)} USD</Styled.TextBody>
                    </Styled.FrameHorizontal>

                    <PaymentForm onConfirm={handlePayment} />
                </Styled.FrameVertical>
            </Styled.Wrapper>
        </Styled.Page>
    );

}

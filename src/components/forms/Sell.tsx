import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";
import * as Styled from "../style/style";
import { estimateGas, getTickets, listTicket } from "../../service/api";
import { weiToUsd } from "../../utils/blockchainUtils";
import { usdToWei } from './../../utils/blockchainUtils';
import { ethers } from "ethers";
import { useModal } from "../../contexts/ModalContext";
import { useModalCode } from "../../contexts/ModalCodeContext";

const SellForm = () => {

    const { openModal } = useModal()
    const { openModalCode } = useModalCode();
    const { user } = useUser();
    const navigate = useNavigate();

    const [pricePerTicket, setPricePerTicket] = useState((0));
    const [quantity, setQuantity] = useState<number>(1);
    const [options, setOptions] = useState(false);
    const [userTickets, setUserTickets] = useState<any[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
    const [fee, setFee] = useState<bigint>()

    const pathParts = location.pathname.split("/");
    const eventId = pathParts[2];

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await getTickets();
                const tickets = response.data.tickets;
                const userTicketsWithDetails = tickets.filter(
                    (ticket: any) => ticket.event === eventId
                );
                setUserTickets(userTicketsWithDetails);
            } catch (error) {
                console.error("Error fetching tickets", error);
            }
        };
        if (eventId) fetchTickets();
    }, [eventId]);

    const handleToggleOptions = () => {
        setOptions(!options);
    };

    const handlePriceValue = (price: number) => {
        
        setPricePerTicket(price);

        const fetchGas = async () => {
            try {
                const resp = await estimateGas(
                    "setTicketForSale",
                    [selectedTicket.tokenId, usdToWei(price).toString()],
                    usdToWei(price).toString()
                );
                const gasPriceGwei = resp.data.gasPrice.split(' ')[0];
                const feeBigInt = ethers.parseUnits(gasPriceGwei, 9);
                setFee(feeBigInt);
            } catch (err) {
                console.error("Error estimating gas", err);
            }
        };

        fetchGas();
    };


    const handleSelectTicket = (ticket: any) => {
        setSelectedTicket(ticket);
        console.log(ticket)
    };

    const handleVerifyCode = async (code: string) => {
        try {
            if (user) {
                const response = await listTicket(selectedTicket.tokenId, pricePerTicket, code);
                navigate(`/tickets`);
            }
            return true;
        } catch (error: any) {
            console.log("Unable to verify code", error);
            return false;
        }
    };

    const handleSubmitSale = () => {

        if (!selectedTicket || !pricePerTicket) return;

        if (pricePerTicket && pricePerTicket <= 0) {
            alert("Please set a valid price and quantity.");
            return;
        }
        openModal(
            {
                title: "Proceed to list your ticket",
                subtitle: "Do you want to proceed?",
                message: `We will charge you a fee of ${fee && weiToUsd(fee).toFixed(8)} USD`,
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
                console.log("PAGE | CHECKOUT", "Payment cancelled.");
            }
        );
    };


    return (
        <Styled.FrameHorizontal className="padding xl sides">
            <Styled.FrameVertical className="padding m tops gap-m">

                <Styled.FrameHorizontal>
                    <Styled.FrameVertical style={{ flex: 2 }}>
                        <Styled.TextHint>Sell your ticket for</Styled.TextHint>
                        <Styled.TextHint>You have {userTickets.length} to sell</Styled.TextHint>
                    </Styled.FrameVertical>

                    <Styled.FrameVertical style={{ flex: 1 }}>
                        <Styled.Button onClick={handleToggleOptions}>
                            {!options ? "Sell Ticket" : "Hide"}
                        </Styled.Button>
                    </Styled.FrameVertical>
                </Styled.FrameHorizontal>

                {options && userTickets.map((ticket: any) => {

                    const isSelected = selectedTicket?.tokenId === ticket.tokenId;

                    return (

                        <Styled.TicketFrame
                            onClick={() => handleSelectTicket(ticket)}
                            className="border padding all s"
                            key={ticket.tokenId}
                            style={{
                                backgroundColor: isSelected ? "var(--color-grey)" : "inherit",
                                color: isSelected ? "white" : "inherit",
                            }}>
                            <Styled.FrameHorizontalPadd
                                style={{
                                    backgroundColor: isSelected ? "var(--color-grey)" : "inherit",
                                    color: isSelected ? "white" : "inherit",
                                }}
                            >
                                Ticket ID {ticket.tokenId}
                            </Styled.FrameHorizontalPadd>
                        </Styled.TicketFrame>
                    );
                })}


                {options && selectedTicket && (
                    <Styled.FrameVertical className="gap-m padding xl top">
                        <Styled.TextSubtitle>Resume</Styled.TextSubtitle>


                        <Styled.FrameHorizontal className="gap-s">
                            <Styled.TextHint style={{ flex: 1 }}>Price per Ticket (USD)</Styled.TextHint>
                            <div className="input-field border" style={{ flex: 1 }}>
                                <span className="frame-flex input padding s all">
                                    <input
                                        type="number"
                                        value={pricePerTicket.toFixed(2)}
                                        onChange={(e) => handlePriceValue(Number(e.target.value))}
                                        placeholder="1"
                                        className="text-subtitle"
                                        step={1}
                                        style={{ textAlign: "right" }}
                                    />
                                    <span style={{ margin: "0 10px", alignSelf: "anchor-center" }}>$</span>
                                </span>
                            </div>
                        </Styled.FrameHorizontal>

                        <Styled.FrameVertical style={{ justifyContent: "space-between" }}>
                            <Styled.FrameHorizontal>
                                <Styled.TextBody>Transaction fee</Styled.TextBody>
                                <Styled.TextBody>{fee && weiToUsd(fee).toFixed(10)} USD</Styled.TextBody>
                            </Styled.FrameHorizontal>
                            <Styled.Separator></Styled.Separator>
                            <Styled.FrameHorizontal style={{ marginTop: 50 }}>
                                <Styled.TextBody>Total sell price:</Styled.TextBody>
                                <Styled.TextSubtitle>{fee && pricePerTicket && (weiToUsd(fee) + pricePerTicket).toFixed(2)} USD</Styled.TextSubtitle>
                            </Styled.FrameHorizontal>
                        </Styled.FrameVertical>

                        {/* Botón Confirmar */}
                        <Styled.Button
                            className={`padding all m ${(pricePerTicket && pricePerTicket <= 0 || quantity <= 0) ? 'disabled' : ''}`}
                            style={{ marginTop: '10px' }}
                            onClick={handleSubmitSale}
                        >
                            Confirm and List Ticket
                        </Styled.Button>
                    </Styled.FrameVertical>
                )}
            </Styled.FrameVertical>
        </Styled.FrameHorizontal >
    );
};

export default SellForm;

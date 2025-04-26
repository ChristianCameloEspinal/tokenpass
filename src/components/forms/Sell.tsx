import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";
import { useEvent } from "../../contexts/EventContext";

import * as Styled from "../style/style";
import QuantityInput from "./QuantityInput";

import { tickets } from "../../utils/examples";
import { TextSubtitle } from './../style/style';

const SellForm = () => {

    const { user } = useUser();
    const { event } = useEvent();

    const navigate = useNavigate();

    const [pricePerTicket, setPricePerTicket] = useState<number>(event?.currentPrice || 0);
    const [quantity, setQuantity] = useState<number>(1);
    const [options, setOptions] = useState(false);

    const handleToggleOptions = () => {
        setOptions(!options);
    };

    const maxSell = tickets.filter(ticket => ticket.owner === user?.id).length || 0;

    const handleSubmitSale = () => {
        if (!event || !user) return;

        if (pricePerTicket <= 0 || quantity <= 0) {
            alert("Please set a valid price and quantity.");
            return;
        }

        const sellData = {
            eventId: event.id,
            sellerId: user.id,
            pricePerTicket,
            quantity,
            totalPrice: pricePerTicket * quantity,
            timestamp: Date.now(),
        };

        console.log("SELL FORM", "Submitting sale:", sellData);

        // Aquí luego iría la petición al backend...

        navigate('/tickets');
    };

    return (
        <Styled.FrameHorizontal className="padding xl sides">
            <Styled.FrameVertical className="padding m tops gap-m">

                <Styled.FrameHorizontal>
                    <Styled.FrameVertical style={{ flex: 2 }}>
                        <Styled.TextHint>Sell your ticket for</Styled.TextHint>
                        <Styled.TextSubtitle>{event?.eventName}</Styled.TextSubtitle>
                        <Styled.TextHint>You have {maxSell} to sell</Styled.TextHint>
                    </Styled.FrameVertical>
                    <Styled.FrameVertical style={{ flex: 1 }}>
                        <Styled.Button onClick={handleToggleOptions}>
                            {!options ? "Sell Ticket" : "Hide"}
                        </Styled.Button>
                    </Styled.FrameVertical>
                </Styled.FrameHorizontal>

                {options && (
                    <Styled.FrameVertical className="gap-m padding xl top">

                        <Styled.TextSubtitle>Resume</Styled.TextSubtitle>
                        {/* Precio por ticket */}
                        <Styled.FrameHorizontal className="gap-s">

                            <Styled.TextHint style={{ flex: 1 }}>Price per Ticket ($)</Styled.TextHint>
                            <div className="input-field border" style={{ flex: 1 }}>
                                <span className="frame-flex input padding s all">
                                    <input
                                        type="number"
                                        value={pricePerTicket}
                                        onChange={(e) => setPricePerTicket(Number(e.target.value))}
                                        placeholder="1"
                                        className="text-subtitle"
                                        style={{ textAlign: "right" }}
                                    />
                                    <span
                                        style={{ margin: "0 10px" }}
                                    >
                                        $
                                    </span>
                                </span>
                            </div>
                        </Styled.FrameHorizontal>

                        {/* Cantidad de tickets */}
                        <Styled.FrameHorizontal className="gap-s">
                            <Styled.TextHint style={{ flex: 1 }}>Quantity</Styled.TextHint>
                            <QuantityInput
                                minQuantity={1}
                                maxQuantity={maxSell}
                                quantity={quantity}
                                setQuantity={setQuantity}
                            />
                        </Styled.FrameHorizontal>

                        {/* Total */}
                        <Styled.FrameVertical style={{ justifyContent: "space-between" }}>
                            <Styled.FrameHorizontal>
                                <Styled.TextBody>Total to receive:</Styled.TextBody>
                                <Styled.TextHint>(After sell)</Styled.TextHint>
                            </Styled.FrameHorizontal>
                            <Styled.Separator></Styled.Separator>
                            <Styled.TextSubtitle>
                                $ {pricePerTicket * quantity}
                            </Styled.TextSubtitle>
                        </Styled.FrameVertical>

                        {/* Botón Confirmar */}
                        <Styled.Button
                            className={`padding all m ${(pricePerTicket <= 0 || quantity <= 0) ? 'disabled' : ''}`}
                            style={{ marginTop: '10px' }}
                            onClick={handleSubmitSale}
                        >
                            Confirm and List Ticket
                        </Styled.Button>

                    </Styled.FrameVertical>
                )}

            </Styled.FrameVertical>
        </Styled.FrameHorizontal>
    );
};

export default SellForm;

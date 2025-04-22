import React from "react";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useEvent } from "../../contexts/EventContext";

import QuantityInput from "./QuantityInput";

import * as Styled from '../style/style'
import { Button, FrameVertical, FrameHorizontal } from './../style/style';

import { tickets, users } from "../../utils/examples";
import { styled } from 'styled-components';
import { useNavigate } from "react-router-dom";

const PurchaseForm = () => {

    const { event } = useEvent();
    const [quantity, setQuantity] = useState(1);
    const [options, showOptions] = useState(false);
    const [seller, setSeller] = useState("");

    const ticketsRelated = tickets.filter((ticket) => ticket.event === event?.id)
    console.log("PURCHASE FORM", "tickets", ticketsRelated)

    const sellOptions = ticketsRelated.reduce((acc, ticket) => {
        if (!acc[ticket.owner]) {
            acc[ticket.owner] = [];
        }
        acc[ticket.owner].push(ticket);
        return acc;
    }, {});

    const handleSelectSeller = (sellerId: string) => {
        setSeller(sellerId);
    }

    const handleOptions = () => {
        showOptions(!options);
    }

    const navigate = useNavigate();

    const handleProceedToPayment = () => {

        if (!seller || !event) return;

        const price = sellOptions[seller][0].price * quantity;

        const purchaseData = {
            eventId: event.id,
            ticketId: sellOptions[seller][0].id,
            seller,
            quantity,
            total: price
        };

        navigate("/checkout", { state: purchaseData });
    };


    console.log("PURCHASE FORM", "sellers", sellOptions)

    return (
        <Styled.FrameHorizontal className="padding xl sides">
            <Styled.FrameVertical className="padding m tops gap-m">

                <Styled.FrameHorizontal>
                    <Styled.FrameVertical style={{ flex: 2 }}>
                        <Styled.TextHint>Purchase the ticket</Styled.TextHint>
                        <Styled.TextSubtitle>{event?.eventName}</Styled.TextSubtitle>
                    </Styled.FrameVertical>
                    <Styled.FrameVertical style={{ flex: 1 }}>
                        <Styled.Button onClick={() => handleOptions()}>{!options ? 'Purchase' : 'Hide'}</Styled.Button>
                    </Styled.FrameVertical>
                </Styled.FrameHorizontal>

                {options && (
                    <Styled.FrameVertical className="gap-m">

                        {/* <Styled.TextHint>Original seller</Styled.TextHint> */}

                        <Styled.FrameVertical>
                            <Styled.TextHint>Resellers</Styled.TextHint>
                            {Object.keys(sellOptions).map((sellerId) => {

                                const sellerName = `Seller ${sellerId}`;
                                const sellerQuantity = sellOptions[sellerId].length;
                                const sellerPrice = sellOptions[sellerId][0].price;
                                const sellerClass = seller === sellerId ? 'border padding all m' : 'border padding all m'
                                const sellerStyle = seller === sellerId ? 'var(--color-grey)' : 'inherit'
                                const sellerColor = seller === sellerId ? 'white' : 'inherit'

                                return (
                                    <Styled.FrameVertical onClick={() => handleSelectSeller(sellerId)} className={sellerClass} key={sellerId} style={{ backgroundColor: sellerStyle, color: sellerColor }}>
                                        <Styled.FrameHorizontal style={{ backgroundColor: 'transparent' }}>
                                            <Styled.FrameVertical style={{ backgroundColor: 'transparent' }}>
                                                <Styled.TextBody>{sellerName}</Styled.TextBody>
                                                <Styled.TextHint>{sellerQuantity} Available</Styled.TextHint>
                                            </Styled.FrameVertical>
                                            <Styled.TextSubtitle style={{ minWidth: 'fit-content' }}>
                                                $ {sellerPrice}
                                            </Styled.TextSubtitle>
                                        </Styled.FrameHorizontal>
                                    </Styled.FrameVertical>
                                );
                            })}

                        </Styled.FrameVertical>

                        {/* Choose Quantity */}
                        {seller && (<>
                            <Styled.FrameHorizontal>
                                <Styled.FrameVertical>
                                    <Styled.TextHint>Quantity</Styled.TextHint>
                                    <QuantityInput minQuantity={1} maxQuantity={10} quantity={quantity} setQuantity={setQuantity}></QuantityInput>
                                </Styled.FrameVertical>
                                <Styled.FrameVertical style={{ textAlign: "right" }}>
                                    <Styled.TextHint></Styled.TextHint>
                                    <Styled.TextHint>Total price</Styled.TextHint>
                                    {event &&
                                        (<Styled.TextSubtitle>
                                            $ {event?.currentPrice * quantity}
                                        </Styled.TextSubtitle>)}
                                </Styled.FrameVertical>
                            </Styled.FrameHorizontal>
                        </>
                        )}
                        {!seller && (<>
                            <Styled.FrameHorizontal>
                                <Styled.FrameVertical>
                                    <Styled.TextSubtitle style={{ textAlign: "center" }}>Choose a seller first to purchase</Styled.TextSubtitle>
                                </Styled.FrameVertical>
                            </Styled.FrameHorizontal>
                        </>)}

                        <Styled.Button
                            className={`padding all m ${!seller ? 'disabled' : ''}`}
                            style={{ marginTop: '10px' }}
                            onClick={handleProceedToPayment}
                        >
                            Proceed to payment
                        </Styled.Button>

                    </Styled.FrameVertical>
                )}

            </Styled.FrameVertical>
        </Styled.FrameHorizontal>

    )
}

export default PurchaseForm;
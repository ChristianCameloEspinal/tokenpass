import React from "react";
import { useState, useEffect } from "react";
import * as Styled from '../style/style'
import { useNavigate, useParams } from "react-router-dom";

import { getEventReselles } from "../../service/api";
import { weiToUsd } from "../../utils/blockchainUtils";

const PurchaseForm = () => {

    const [quantity, setQuantity] = useState(1);
    const [options, showOptions] = useState(false);
    const [seller, setSeller] = useState<any>(null);
    const [resellers, setResellers] = useState({});

    const pathParts = location.pathname.split("/");
    const eventId = pathParts[2];

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEventReselles(eventId);
                const eventsArray = data.data;
                setResellers(eventsArray);
            } catch (error) {
                console.error("Error fetching resellers:", error);
            }
        };
        if (eventId) {
            fetchEvent();
        }
    }, [eventId]);

    const handleSelectSeller = (ticket: any) => {
        setSeller(ticket);
    }

    const handleOptions = () => {
        showOptions(!options);
    }

    const navigate = useNavigate();

    const handleProceedToPayment = () => {

        if (!seller) return;

        const purchaseData = {
            ticketId: seller?.tokenId,
            seller: seller?.to,
            total: seller?.price
        };

        navigate("/checkout", { state: purchaseData });
    };

    return (
        <Styled.FrameHorizontal className="padding xl sides">
            <Styled.FrameVertical className="padding m tops gap-m">

                <Styled.FrameHorizontal>
                    <Styled.FrameVertical style={{ flex: 2 }}>
                        <Styled.TextHint>Purchase the ticket</Styled.TextHint>
                    </Styled.FrameVertical>
                    <Styled.FrameVertical style={{ flex: 1 }}>
                        <Styled.Button onClick={() => handleOptions()}>{!options ? 'Purchase' : 'Hide'}</Styled.Button>
                    </Styled.FrameVertical>
                </Styled.FrameHorizontal>

                {resellers && options && (
                    <Styled.FrameVertical className="gap-m">

                        <Styled.FrameVertical>
                            <Styled.FrameHorizontal>
                                <Styled.TextHint>Resellers</Styled.TextHint>
                                <Styled.TextHint>Price</Styled.TextHint>
                            </Styled.FrameHorizontal>
                            {Object.keys(resellers).map((tokenId) => {

                                const reseller = resellers[tokenId];
                                const sellerPrice = reseller.price;

                                let sellerClass = 'border padding all m';
                                let sellerStyle = 'inherit';
                                let sellerColor = 'inherit';

                                if (seller && seller.tokenId === reseller.tokenId) {
                                    sellerStyle = 'var(--color-grey)';
                                    sellerColor = 'white';
                                }

                                return (
                                    <Styled.FrameVertical
                                        onClick={() => handleSelectSeller(reseller)}
                                        className={sellerClass}
                                        key={tokenId}
                                        style={{ backgroundColor: sellerStyle, color: sellerColor }}
                                    >
                                        <Styled.FrameHorizontal style={{ backgroundColor: 'transparent' }}>
                                            <Styled.FrameVertical style={{ backgroundColor: 'transparent' }}>
                                                <Styled.TextBody>Ticket ID {reseller.tokenId}</Styled.TextBody>
                                            </Styled.FrameVertical>
                                            <Styled.TextSubtitle style={{ minWidth: 'fit-content' }}>
                                                {weiToUsd(sellerPrice).toFixed(2)} USD
                                            </Styled.TextSubtitle>
                                        </Styled.FrameHorizontal>
                                    </Styled.FrameVertical>
                                );
                            })}


                        </Styled.FrameVertical>

                        <Styled.Button
                            className={`padding all m ${!seller ? 'disabled' : ''}`}
                            style={{ marginTop: '10px' }}
                            onClick={handleProceedToPayment}
                        >
                            {!seller ? "Select an option to purchase" : "Procede to payment"}
                        </Styled.Button>

                    </Styled.FrameVertical>
                )}

            </Styled.FrameVertical>
        </Styled.FrameHorizontal>

    )
}

export default PurchaseForm;
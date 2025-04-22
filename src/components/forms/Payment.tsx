import React, { useState } from "react";
import * as Styled from "../style/style";
import { useLocation } from "react-router-dom";

/**
 * Formulario de pago, recibe los datos del metodo de pago, por defecto tarjeta
 * @param param0 Funcion Callback cuando se confirman los datos de pago
 * @returns 
 */
const PaymentForm = ({ onConfirm }: { onConfirm: (data: any) => void }) => {

    const { state } = useLocation();
    const [cardNumber, setCardNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        
        e.preventDefault();

        const paymentData = {
            cardNumber,
            name,
            expiry,
            cvv,
        };

        console.log("FORM | PAYMENT","Sending payment info:", paymentData);
        console.log("FORM | PAYMENT","Sending ticket info:", state);

        onConfirm(paymentData);
    };

    return (
        <>
        <Styled.TextSubtitle>Payment</Styled.TextSubtitle>
            <Styled.TextHint>Enter your payment details</Styled.TextHint>

            <Styled.Form onSubmit={handleSubmit}>
                <Styled.InputBox>
                    <Styled.TextBody>Cardholder Name</Styled.TextBody>
                    <Styled.InputField>
                        <Styled.Input>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Styled.Input>
                    </Styled.InputField>
                </Styled.InputBox>

                <Styled.InputBox>
                    <Styled.TextBody>Card Number</Styled.TextBody>
                    <Styled.InputField>
                        <Styled.Input>
                            <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                pattern="\d{16}"
                                maxLength={19}
                                required
                            />
                        </Styled.Input>
                    </Styled.InputField>
                </Styled.InputBox>

                <Styled.FrameHorizontal style={{ gap: "20px" }}>
                    <Styled.InputBox style={{ flex: 1 }}>
                        <Styled.TextBody>Expiry</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    pattern="\d{2}/\d{2}"
                                    required
                                />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.InputBox style={{ flex: 1 }}>
                        <Styled.TextBody>CVV</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input
                                    type="password"
                                    placeholder="•••"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    pattern="\d{3}"
                                    maxLength={4}
                                    required
                                />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>
                </Styled.FrameHorizontal>

                <Styled.Button style={{ marginTop: "20px" }}>Confirm Payment</Styled.Button>
            </Styled.Form>
        </>
    );
};

export default PaymentForm;

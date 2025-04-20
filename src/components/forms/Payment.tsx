import React, { useState } from "react";
import * as Styled from "../style/style";

const PaymentForm = ({ onConfirm }: { onConfirm: () => void }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Aquí iría la lógica de procesamiento de pago o integración con un servicio externo.
        const paymentData = {
            cardNumber,
            name,
            expiry,
            cvv,
        };

        console.log("Sending payment info:", paymentData);
        onConfirm(); // o redirigir o mostrar estado de éxito
    };

    return (
        <Styled.FrameFloating>
            <Styled.TextSubtitle>Enter your payment details</Styled.TextSubtitle>

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
        </Styled.FrameFloating>
    );
};

export default PaymentForm;

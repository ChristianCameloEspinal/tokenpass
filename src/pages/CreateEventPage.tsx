import React, { useEffect, useState } from "react";
import * as Styled from "../components/style/style";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { createEvent, estimateGas } from "../service/api";
import { usdToWei, weiToUsd } from "../utils/blockchainUtils";
import { Separator } from './../components/style/style';
import { ethers } from "ethers";

export default function CreateEventPage() {
    const { user } = useUser();
    const navigate = useNavigate();

    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [ticketsAmount, setTicketsAmount] = useState(1);
    const [price, setPrice] = useState(0);
    const [eventDescription, setEventDescription] = useState("");
    const [error, setError] = useState("");
    const [gasInfo, setGasInfo] = useState(0);

    const fetchGas = async () => {
        if (price === 0 || !user) return;
        try {
            const resp = await estimateGas(
                "mintAndList",
                [ "0", usdToWei(price).toString()],
                usdToWei(price).toString()
            );
            console.log(resp)
            const gasPrice = resp.data.gasPrice;
            const totalCost = weiToUsd(ethers.parseUnits(gasPrice, "gwei")) * ticketsAmount;
            setGasInfo(totalCost);
        } catch (err: any) {
            console.error("Error estimating gas", err);
            setError("Unable to estimate gas fee");
        }
    };

    useEffect(() => {
        fetchGas();
    }, [price || ticketsAmount]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const eventData = {
                eventName,
                eventDate: new Date(eventDate).toISOString(),
                location,
                type,
                image,
                eventDescription,
                ticketsAmount: ticketsAmount,
                price: usdToWei(price),
            };
            const response = await createEvent(eventData);
            if (response.status === 200) {
                navigate("/events");
            } else {
                setError("Failed to create event.");
            }
        } catch (err) {
            console.error("Error creating event:", err);
            setError("Something went wrong. Try again.");
        }
    };

    if (!user?.user?.distributor) {
        return (
            <Styled.Page>
                <Styled.Wrapper>
                    <Styled.TextSubtitle>You do not have permission to create events.</Styled.TextSubtitle>
                </Styled.Wrapper>
            </Styled.Page>
        );
    }

    return (
        <Styled.Page>
            <Styled.Wrapper>
                <Styled.Title>Create New Event</Styled.Title>
                {error && <Styled.TextHint>{error}</Styled.TextHint>}
                <Styled.Form onSubmit={handleSubmit}>
                    <Styled.InputBox>
                        <Styled.TextBody>Event Name</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    type="text"
                                    placeholder="Event Title"
                                    required
                                />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.InputBox>
                        <Styled.TextBody>Date</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    type="datetime-local"
                                    required
                                />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.InputBox>
                        <Styled.TextBody>Location</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    type="text"
                                    placeholder="Event Location"
                                    required
                                />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.InputBox>
                        <Styled.TextBody>Type</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    type="text"
                                    placeholder="Concert, Conference..."
                                    required
                                />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.InputBox>
                        <Styled.TextBody>Image URL</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    type="url"
                                    placeholder="https://image.com/img.jpg"
                                    required
                                />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.InputBox>
                        <Styled.TextBody>Description</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <textarea
                                    value={eventDescription}
                                    onChange={(e) => setEventDescription(e.target.value)}
                                    placeholder="Description of the event"
                                    required
                                    style={{ width: "100%", height: "100px", resize: "vertical" }}
                                />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>
                    <Styled.InputBox>
                        <Styled.TextBody>Tickets to create</Styled.TextBody>
                        <Styled.InputField>
                            <Styled.Input>
                                <input
                                    value={ticketsAmount}
                                    type="number"
                                    onChange={(e) => setTicketsAmount(e.target.valueAsNumber)}
                                    min={1}
                                    placeholder="0"
                                    required
                                />
                            </Styled.Input>
                        </Styled.InputField>
                    </Styled.InputBox>

                    <Styled.InputBox>
                        <Styled.TextBody>Price per ticket</Styled.TextBody>


                        <div className="input-field border" style={{ flex: 1 }}>
                            <span className="frame-flex input padding m all">
                                <input
                                    type="number"
                                    value={price.toFixed(2)}
                                    onChange={(e) => setPrice(e.target.valueAsNumber)}
                                    placeholder="1"
                                    className="text-subtitle"
                                    step={1}
                                    style={{ textAlign: "right" }}
                                />
                                <span style={{ margin: "0 10px", alignSelf: "anchor-center" }}>$</span>
                            </span>
                        </div>

                    </Styled.InputBox>
                    <Styled.Separator />
                    <Styled.FrameHorizontal>
                        <Styled.TextBody>Transaction Fee</Styled.TextBody>
                        <Styled.TextBody>
                            {gasInfo.toFixed(2)} USD
                        </Styled.TextBody>
                    </Styled.FrameHorizontal>

                    <Styled.Button>Create Event</Styled.Button>
                </Styled.Form>
            </Styled.Wrapper>
        </Styled.Page>
    );
}

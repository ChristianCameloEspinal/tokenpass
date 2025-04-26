// Sell.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Line } from 'react-chartjs-2';

import { useUser } from "../contexts/UserContext";
import * as Styled from '../components/style/style';

import { EventType } from "../utils/types";
import { events } from "../utils/examples";
import { useEvent } from './../contexts/EventContext';
import QuantityInput from "../components/forms/QuantityInput";

export default function SellPage() {

    const { event, setEvent } = useEvent();
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState<EventType | null>(null);
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        const foundEvent = events.find((event) => event.id === Number(id));
        if (foundEvent) {
            setEvent(foundEvent);
            setEventData(foundEvent);
        }
    }, [id]);

    if (!eventData) {
        return <div>Loading or Event not found...</div>;
    }

    // const handleSell = () => {
    //     // Aquí en el futuro deberías hacer una petición al backend para listar el ticket
    //     console.log("Selling ticket at price:", price);
    //     navigate('/tickets'); // Vuelve a tus tickets luego de venderlo
    // };

    const { eventName, eventDate, location, type } = eventData;

    const data = {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00'], // Las etiquetas en el eje X (tiempo)
        datasets: [
            {
                label: 'Sell on',
                data: [120, 180, 150, 200, 190],
                fill: false,
                borderColor: '',
                tension: 0.3,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: 'Gráfico de Línea - Valores con el tiempo',
            },
            tooltip: {
                intersect: false,
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: false,
                },
            },
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
        }
    };

    return (
        <Styled.Page>
            <Styled.Wrapper>
                <Styled.ButtonSmall onClick={() => navigate(-1)}>
                    Back
                </Styled.ButtonSmall>
                <Styled.Title>Sell your Ticket</Styled.Title>
                <Styled.EventPhoto src="https://picsum.photos/300" alt="Event" />
                <Styled.FrameVerticalMain>
                    <Styled.FrameHorizontal>
                        <Styled.FrameVertical>
                            <Styled.TextHint>{eventDate}</Styled.TextHint>
                            <Styled.TextSubtitle>{eventName}</Styled.TextSubtitle>
                            <Styled.TextLink>{location}</Styled.TextLink>
                        </Styled.FrameVertical>
                        <Styled.FrameVertical style={{ textAlign: "right" }}>
                            <Styled.TextHint>{type}</Styled.TextHint>
                        </Styled.FrameVertical>
                    </Styled.FrameHorizontal>

                    <Line data={data} options={options} />

                </Styled.FrameVerticalMain>
            </Styled.Wrapper>
        </Styled.Page>
    );
}

// Sell.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Line } from 'react-chartjs-2';

import { useUser } from "../contexts/UserContext";
import * as Styled from '../components/style/style';

import { EventType } from "../utils/types";
import { useEvent } from './../contexts/EventContext';
import QuantityInput from "../components/forms/QuantityInput";
import { getEventById, getSales } from "../service/api";

export default function SellPage() {

    const { event, setEvent } = useEvent();
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState<EventType | null>(null);
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState<number>(0);
    const [sales,setSales] = useState([])

    useEffect(() => {
        if (id) {
            const fetchEvent = async () => {
                try {
                    const response = await getEventById(id);
                    const historic = await getSales(id);
                    if (response.success) {
                        setEventData(response.data.event); 
                    } else {
                        console.error('Error fetching event:', response.error);
                    }
                    if(historic.success){
                        setSales(historic.data.message)
                    }
                } catch (error) {
                    console.error("Error fetching events", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchEvent();
        }
    }, [id]);

    if (!eventData) {
        return <div>Loading or Event not found...</div>;
    }

    const { eventName, eventDate, location, type } = eventData;

    const data = {
        labels: sales.map((sale:any) => new Date(sale?.timestamp).toLocaleString()),
        datasets: [
            {
                label: 'Sell on',
                data: sales.map((sale:any) => (sale?.price * 0.00001971).toFixed(2)),
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
                    text:"USD $",
                    display: true,
                },
            },
        }
    };

    return (
        <Styled.Page>
            <Styled.Wrapper>
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

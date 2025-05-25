import React, { useEffect, useState } from "react";
import * as Styled from "../components/style/style";
import { useUser } from "../contexts/UserContext";
import { getSales, getOrganizerEvents, getEventById } from "../service/api";
import { useParams } from "react-router-dom";
import { formatDateToDDMMYYYY, weiToUsd } from "../utils/blockchainUtils";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
export default function SalesPage() {

    const [sales, setSales] = useState([]);
    const [eventData, setEventData] = useState<any | null>(null);
    const [dataChart, setDataChart] = useState<any>(null);
    const { id } = useParams();

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
                    if (historic.success) {
                        setSales(historic.data.message)
                    }
                } catch (error) {
                    console.error("Error fetching events", error);
                }
            };
            fetchEvent();
        }
    }, [id]);

    const data = {
        labels: sales.map((sale: any) => new Date(sale?.timestamp).toLocaleString()),
        datasets: [
            {
                label: 'Sell on',
                data: sales.map((sale: any) => (sale?.price * 0.00001971).toFixed(2)),
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
                    text: "USD $",
                    display: true,
                },
            },
        }
    };




    return (
        <Styled.Page>
            <Styled.Wrapper>
                <Styled.Title>Ticket Sales</Styled.Title>
                {eventData && <Styled.TicketFrame>
                    <Styled.FrameHorizontalPadd>
                        <Styled.FrameVertical>
                            <Styled.TextHint>{formatDateToDDMMYYYY(eventData?.eventDate)}</Styled.TextHint>
                            <Styled.TextSubtitle>{eventData?.eventName}</Styled.TextSubtitle>
                            <Styled.TextLink>{eventData?.location}</Styled.TextLink>
                        </Styled.FrameVertical>
                        <Styled.FrameVertical style={{ textAlign: "right" }}>
                            <Styled.TextHint>{eventData?.type}</Styled.TextHint>
                        </Styled.FrameVertical>
                    </Styled.FrameHorizontalPadd>
                </Styled.TicketFrame>}
                <Styled.TextSubtitle>Ticket Sales</Styled.TextSubtitle>

                {sales && data ? (<>
                    <Line data={data} options={options} />
                    <Styled.FrameVertical style={{ gap: "10px", marginTop: "20px" }}>
                        {sales.map((sale: any, index) => (
                            <Styled.TicketFrame key={index}>
                                <Styled.FrameVertical style={{ padding:"15px", gap: "5px" }}>
                                    <Styled.TextBody>Buyer: {sale?.newOwner || "Unknown"}</Styled.TextBody>
                                    <Styled.TextHint>Price: {weiToUsd(sale?.price)} €</Styled.TextHint>
                                </Styled.FrameVertical>
                            </Styled.TicketFrame>
                        ))}
                    </Styled.FrameVertical></>
                ) : (
                    <Styled.TextHint>No sales yet for this event.</Styled.TextHint>
                )}

            </Styled.Wrapper>
        </Styled.Page>
    );
}

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

import * as Styled from '../../components/style/style';

import PurchaseForm from "../forms/Purchase";
import SellForm from "../forms/Sell";

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation(); // 💡 Agregado para obtener la ruta actual
    const [able, setAble] = useState(false);
    const { user } = useUser();

    const isEventPage = location.pathname.startsWith("/event/");
    const isSellPage = location.pathname.startsWith("/sell/");

    const handleLocation = (location: string) => {
        navigate(location);
    };

    useEffect(() => {
        if (user) {
            setAble(true);
        } else {
            setAble(false);
        }
    }, [user]);

    if (!able) return null; 

    return (
        <Styled.FrameVerticalFixed className="shadow" style={{ bottom: 0 }}>
            {isSellPage && <SellForm />}
            {isEventPage && <PurchaseForm />}
            <Styled.FrameHorizontal className="padding xl all">
                <span onClick={() => handleLocation('/tickets')} className="material-symbols-outlined">
                    sell
                </span>
                <span onClick={() => handleLocation('/')} className="material-symbols-outlined">
                    shopping_cart
                </span>
                <span onClick={() => handleLocation('/profile')} className="material-symbols-outlined">
                    person
                </span>
            </Styled.FrameHorizontal>
        </Styled.FrameVerticalFixed>
    );
}

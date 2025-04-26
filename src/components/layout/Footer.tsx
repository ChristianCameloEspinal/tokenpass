import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

import * as Styled from '../../components/style/style';

import QuantityInput from "../forms/QuantityInput";
import PurchaseForm from "../forms/Purchase";
import PaymentForm from "../forms/Payment";
import SellForm from "../forms/Sell";

export default function Footer() {

    const navigate = useNavigate();
    const isEventPage = location.pathname.startsWith("/event/");
    const isSellPage = location.pathname.startsWith("/sell/");

    const handleLocation = (location:string) =>{
        navigate(location);
    }

    return (
        <Styled.FrameVerticalFixed className="shadow" style={{ bottom: 0 }}>
            {isSellPage && (<SellForm></SellForm>)}
            {isEventPage &&(<PurchaseForm></PurchaseForm>)}
            <Styled.FrameHorizontal className="shadow padding xl all">
                <span onClick={()=>handleLocation('/tickets')} className="material-symbols-outlined">
                    sell
                </span>
                <span onClick={()=>handleLocation('/') }className="material-symbols-outlined">
                    shopping_cart
                </span>
                <span className="material-symbols-outlined">
                    person
                </span>
            </Styled.FrameHorizontal>
        </Styled.FrameVerticalFixed>)
}
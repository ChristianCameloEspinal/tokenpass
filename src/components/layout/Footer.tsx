import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

import * as Styled from '../../components/style/style';

import QuantityInput from "../forms/QuantityInput";
import PurchaseForm from "../forms/Purchase";
import PaymentForm from "../forms/Payment";


export default function Footer() {

    const location = useLocation();

    const isEventPage = location.pathname.startsWith("/event/");

    return (
        <Styled.FrameVerticalFixed className="shadow" style={{ bottom: 0 }}>
            {isEventPage &&(<PurchaseForm></PurchaseForm>)}
            <Styled.FrameHorizontal className="shadow padding xl all">
                <span className="material-symbols-outlined">
                    sell
                </span>
                <span className="material-symbols-outlined">
                    shopping_cart
                </span>
                <span className="material-symbols-outlined">
                    person
                </span>
            </Styled.FrameHorizontal>
        </Styled.FrameVerticalFixed>)
}
import React from "react";

import { ModalProvider } from "./ModalContext";
import { ModalCodeProvider } from "./ModalCodeContext";
import { UserProvider } from "./UserContext";
import { combineComponents } from "../utils/combineComponent";
import { EventProvider } from "./EventContext";

const providers = [
    ModalProvider,
    ModalCodeProvider,
    UserProvider,
    EventProvider
]

export const AppContextProvider = combineComponents(...providers);

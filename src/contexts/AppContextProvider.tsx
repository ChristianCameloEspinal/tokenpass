import React from "react";

import { ModalProvider } from "./ModalContext";
import { UserProvider } from "./UserContext";
import { combineComponents } from "../utils/combineComponent";

const providers = [
    ModalProvider,
    UserProvider
]

export const AppContextProvider = combineComponents(...providers);

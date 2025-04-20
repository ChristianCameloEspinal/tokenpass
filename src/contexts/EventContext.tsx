import React, { createContext, useContext, useState } from 'react';

export type Event = {
    id: number;
    eventName: string;
    eventDate: string;
    type: string;
    lastPrice: number;
    currentPrice: number;
    location: string;
    image: string;
    eventDescription: string;
};

type EventContextType = {
    event: Event | null;
    setEvent: (event: Event) => void;
    purchase: (event: Event) => boolean;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvent = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEvent must be used within a EventProvider");
    }
    return context;
};

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
    const [event, setEvent] = useState<Event | null>(null);

    const purchase = () => {

        /* Logica de la compra */

        return true
    };

    return (
        <EventContext.Provider value={{ event, setEvent, purchase }}>
            {children}
        </EventContext.Provider>
    );
};
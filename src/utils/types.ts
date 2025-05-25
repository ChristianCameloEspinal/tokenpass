
export interface EventType {
    id: number;
    eventName: string;
    eventDate: string;
    type: string;
    location: string;
    image: string;
    lastPrice: number;
    currentPrice: number;
    eventDescription: string;
    organizerId: string;
}

export interface UserType {
    user: UserType
    id: string;
    name: string;
    email: string;
    phone: string;
    dob: string;
    token: string;
    password: string;
    distributor: boolean;
    wallet: string;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: string;
}

export interface TicketType {
    tokenId: any;
    forSale: any;
    eventInfo:  string;
    event(id: number, event: any): void;
    id: number
    eventName: string,
    eventDate: string,
    location: string,
    type: string,
    image: string,
    eventDescription:string
}

export interface ModalPropsType {
    content: {
        title: string;
        subtitle: string;
        message: string;
    };
    resolve: () => void;
    reject: () => void;
};

export interface ModalPropsCodeType {
    content: {
        title: string;
        subtitle?: string;
        message?: string;
    };
    resolve: () => void;
    reject: () => void;

}
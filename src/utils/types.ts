
// Definimos un tipo para el evento
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
}

// Definimos un tipo para el usuario
export interface UserType {
    id: string;
    name: string;
    email: string;
    phone: string;
    dob: string;
    token: string;
    password: string;
}

// Definimos un tipo para la respuesta de una API, por ejemplo:
export interface ApiResponse<T> {
    data: T;
    message: string;
    status: string;
}

// También puedes definir tipos de otros objetos que uses en tu aplicación
export interface TicketType {
    id: number;
    event: number;
    price: number;
    purchasedDate: string;
    owner: string
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
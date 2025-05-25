import { UserType } from "../utils/types";
const API_URL = "http://localhost:5000/api";


export const registerUser = async (userData: UserType): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userData }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message || 'Registration failed' };
        }

        return { success: true, data: data };
    } catch (error: any) {
        console.error("Error during user registration:", error);
        return { success: false, error: 'Network error during registration' };
    }
};

export const checkUserPhone = async (): Promise<any> => {
    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/auth/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message || 'Failed to send verification code' };
        }

        return { success: true, message: data.message };
    } catch (error: any) {
        console.error("Error checking user phone:", error);
        return { success: false, error: 'Network error while checking phone' };
    }
};

export const checkUserPhoneRaw = async (phone: string): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/auth/checkraw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(phone)
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message || 'Failed to send verification code' };
        }

        return { success: true, message: data.message };
    } catch (error: any) {
        console.error("Error checking user phone:", error);
        return { success: false, error: 'Network error while checking phone' };
    }
};

export const validateUserCode = async (code: string): Promise<any> => {
    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/auth/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            },
            body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message || 'Invalid verification code' };
        }

        return { success: true, message: data.message };
    } catch (error: any) {
        console.error("Error validating user code:", error);
        return { success: false, error: 'Network error during validation' };
    }
};

export const loginUser = async (credentials: { email: string; password: string }): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message || 'Login failed' };
        }

        return { success: true, data: data };
    } catch (error: any) {
        console.error("Error during login:", error);
        return { success: false, error: 'Network error during login' };
    }
};

export const getEvents = async (): Promise<any> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/utils/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: 'Unable to get Events' };
        }
        return { success: true, data: data };
    } catch (error: any) {
        return { success: false, error: 'Network error during listing events' };
    }
}

export const getEventById = async (id: string): Promise<any> => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/utils/events/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: 'Unable to get event by ID' };
        }

        return { success: true, data: data };
    } catch (error: any) {
        return { success: false, error: 'Network error during fetching event' };
    }
};

export const getEventReselles = async (event: string): Promise<any> => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/transaction/tickets/event/listed/${event}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            }
        });

        const data = await response.json();
        //console.log("RESELLES",data)
        if (!response.ok) {
            return { success: false, error: 'Unable to get event tickets by ID' };
        }

        return { success: true, data: data };
    }
    catch (error) {
        return { success: false, error: 'Network error during fetching event' };
    }
}

export const purchaseTickets = async (tokenId: any, code: string): Promise<any> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/transaction/tickets/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ tokenId, code }),
        });

        const status = await response.json();

        if (!response.ok) {
            return { success: false, error: 'Unable to purchase ticket' };
        }

        return { success: true, data: status };
    }
    catch (error) {
        return { success: false, error: 'Network error during fetching event' };
    }
}

export const estimateGas = async (functionName: string, args: any[], value: string): Promise<any> => {
    try {
        console.log("Estimating gas for function:", functionName, "with args:", args, "and value:", value);
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/transaction/estimategas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ functionName, args, value}),
        });
        const status = await response.json();

        if (!response.ok) {
            return { success: false, error: 'Unable to purchase ticket' };
        }

        return { success: true, data: status };

    }
    catch (error) {
        return { success: false, error: 'Network error during fetching event' };
    }

}

export const getTickets = async (): Promise<any> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/transaction/tickets/wallet`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            }
        });

        const status = await response.json();

        if (!response.ok) {
            return { success: false, error: 'Unable to obtain tickets' };
        }

        return { success: true, data: status };
    }
    catch (error) {
        return { success: false, error: 'Network error during fetching event' };
    }
}

export const listTicket = async (tokenId: any, price: number, code: string): Promise<any> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/transaction/tickets/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ tokenId, price, code }),
        });

        const status = await response.json();

        if (!response.ok) {
            return { success: false, error: 'Unable to purchase ticket' };
        }

        return { success: true, data: status };
    }
    catch (error) {
        return { success: false, error: 'Network error during fetching event' };
    }
}

export const unlistTicket = async (tokenId: any, code: string): Promise<any> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/transaction/tickets/unlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ tokenId, code }),
        });

        const status = await response.json();

        if (!response.ok) {
            return { success: false, error: 'Unable to unlist ticket' };
        }

        return { success: true, data: status };
    }
    catch (error) {
        return { success: false, error: 'Network error during fetching event' };
    }
}

export const getSales = async (tokenId: any): Promise<any> => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/transaction/sales`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ eventId: tokenId })
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: 'Unable to get sales for event by ID' };
        }

        return { success: true, data: data };
    } catch (error: any) {
        return { success: false, error: 'Network error during fetching event' };
    }
};

export const updateProfile = async (userData: UserType): Promise<any> => {
}

export const getOrganizerEvents = async () => {

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/utils/organizer`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            }
        });

        const status = await response.json();

        if (!response.ok) {
            return { success: false, error: 'Unable to unlist ticket' };
        }

        return { success: true, data: status };
    }
    catch (error) {
        return { success: false, error: 'Network error during fetching event' };
    }
};

export const createEvent = async (eventData: any): Promise<any> => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/utils/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ eventData })
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message || 'Unable to create event' };
        }

        return { success: true, data: data };
    } catch (error: any) {
        return { success: false, error: 'Network error during event creation' };
    }
};

export const validateTicket = async (ticketData: {
    tokenId: number;
    nonce: number;
    expiration: number;
    signature: string;
}) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/ticket/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(ticketData)
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message || "Validation failed" };
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: "Network error" };
    }
};

export const getQR = async (eventId: string): Promise<any> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/utils/qr/${eventId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ eventId }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message || 'Unable to get QR code' };
        }

        return { success: true, data: data };
    } catch (error: any) {
        return { success: false, error: 'Network error during fetching QR code' };
    }
}
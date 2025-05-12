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

export const checkUserPhone = async (phone: string): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/auth/checkuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone }),
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

export const validateUserCode = async (phone: string, code: string): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/auth/validateuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, code }),
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
        const response = await fetch(`${API_URL}/login`, {
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
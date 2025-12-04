
const API_BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:8080/api/v1';

export type ApiError = {
    status: number | null;
    message: string;
    details?: unknown;
}

async function handleResponse(response: Response) {
    const text = await response.text();
    let json: any = null;
    try {
        json = text ? JSON.parse(text) : null;
        console.log("Response JSON:", json);
    } catch (e) {
        // Implement appropriate error handling here
    }

    if (!response.ok) {

        if (response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            // clear user session or token
        }

        const error: ApiError = {
            status: response.status,
            message: json?.message || "No message",
            details: json,
        };
        throw error;
    }
    return json ?? text;
}

function getToken(): string | null {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqYW5lLnJlY3J1aXRlckBleGFtcGxlLmNvbSIsInJvbGUiOiJSRUNSVUlURVIiLCJpYXQiOjE3NjQwNzIzNDQsImV4cCI6MTc2NDkzNjM0NH0.mRISo3VaTjqtr2QbcBaPwuRyO7of91prxUQ1CjoDWyA" ; 
    // localStorage.getItem('authToken') 
}

export async function get(path: string){
    const url = `${API_BASE}${path}`;
    const token = getToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
    const res = await fetch(url, {
        method: 'GET',
        headers: headers});

    return (await handleResponse(res));
}

export async function post(path: string, body?: any){
    const url = `${API_BASE}${path}`;
    const token = getToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
    const res = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body ? JSON.stringify(body) : undefined})

    return (await handleResponse(res));
}

export default {get, post}
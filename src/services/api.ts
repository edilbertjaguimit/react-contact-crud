import { Contact } from '@/models/Contact';
import axios from 'axios';
const baseURL = 'http://localhost:5132/api/'; // Default API base URL
// console.log('baseURL', baseURL);
console.log(import.meta.env);
console.log(import.meta.env.BASE_API_URL);
console.log(import.meta.env.BASE_TEST);
export const api = axios.create({
    baseURL: baseURL, // Replace with your API base URL
    timeout: 1 * 60 * 1000, // 1 minute request timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchContact = async (): Promise<Contact[]> => {
    const response = await api.get('contact');
    console.log('Response', response.data);
    return response.data;
};

export const addContact = async (contact: Contact): Promise<void> => {
    contact.contactId = 0;
    contact.contactStatus = 'ACTIVE';
    console.log('Contact', contact);
    const response = await api.post('contact', contact);
    console.log('Response', response.data);
    return response.data;
};

export const updateContact = async (contact: Contact): Promise<void> => {
    console.log('Contact', contact);
    const response = await api.put(`contact`, contact);
    console.log('Response', response.data);
    return response.data;
};

export const deleteContact = async (contactId: number): Promise<void> => {
    const response = await api.delete(`contact/${contactId}`);
    console.log('Response', response.data);
    return response.data;
};

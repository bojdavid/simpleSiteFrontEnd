import { writable } from 'svelte/store';

export const stats = writable({
    services: { total: 0, pending: 0 },
    reviews: { total: 0, pending: 0 },
}); 

export const user = writable({
    name: '',
    email: '',
    profilePicture: '',
    id: ''
});
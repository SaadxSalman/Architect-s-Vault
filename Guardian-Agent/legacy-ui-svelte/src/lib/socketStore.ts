import { writable } from 'svelte/store';

export const threatStream = writable<string[]>([]);
export const engineStatus = writable<'connected' | 'disconnected'>('disconnected');

let socket: WebSocket;

export function connectToEngine(url: string) {
    socket = new WebSocket(url);

    socket.onopen = () => engineStatus.set('connected');
    socket.onclose = () => engineStatus.set('disconnected');
    
    socket.onmessage = (event) => {
        threatStream.update(msgs => [event.data, ...msgs].slice(0, 50));
    };
}
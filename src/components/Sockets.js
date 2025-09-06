import { create, get } from "zustand"
import io from 'socket.io-client';
const socketStore = create((set, get) => ({
    socket: null,
    connect: () => {
        const socket = io("http://localhost:3000");
        console.log('socket val : ', socket)
        console.log("connected")
        set({ socket });
    },
    socketSend: (event, data) => {
        const { socket } = get();
        if (!socket) return;
        socket.emit(event, JSON.stringify(data));
    },
    disconnect: () => {
        const { socket } = get();
        if (socket) {
            socket.disconnect();
            console.log("disconnected")

            set({ socket: null });
        }
    }
}));

export const useSocketStore = socketStore;
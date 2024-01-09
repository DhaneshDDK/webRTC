import { useMemo, useContext, createContext, Children } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = ()=>{
    const socket = useContext(SocketContext);
    return socket;
}

export const SocketProvider = ({children})=>{
    const socket = useMemo(()=> io("localhost:5000"),[]);
    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
}
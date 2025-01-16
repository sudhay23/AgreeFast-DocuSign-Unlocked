import { appConfig } from "@/config/config";
import { io } from "socket.io-client";

const URL = `${appConfig.backendUrl}`;

export const socket = io(URL, {
  autoConnect: false,
});

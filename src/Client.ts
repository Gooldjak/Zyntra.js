import { Action, ActionType, readyAction, messagesendAction, messagedeleteAction, messagegetAction } from "./Actions/Action";
import { Message } from './Functions/Message';
import { io, Socket } from "socket.io-client";

export class Client {
  private token: string;
  private id: number;
  private username: string = "";
  private events = new Map<ActionType, (action: Action) => void>();
  private BASE_URL: string = "https://zyntra.gg/api/v1";
  private socket: Socket;
  private messageHandler: Message;

  constructor(token: string, id: number) {

    this.socket = io("https://zyntra.gg", {
      path: "/ws/",
      transports: ['websocket'],
      extraHeaders: { 'User-Agent': 'ZyntraBot/1.0' }
    });

    if (!token || typeof token !== 'string') {
      throw new Error("Token is required and must be a string.");
    }

    if (typeof id !== 'number' || isNaN(id)) {
      throw new Error("ID is required and must be a valid number.");
    }

    this.token = token;
    this.id = id;

    this.messageHandler = new Message(this.BASE_URL, this.token, this.id, this.emit.bind(this), this.socket);
  }
  public on(actionType: ActionType, callback: (action: Action) => void) {
    this.events.set(actionType, callback);
  }

  private emit(actionType: ActionType, action: Action) {
    const cb = this.events.get(actionType);
    if (cb) cb(action);
  }

  public async connect() {
    this.socket.emit('join', {
        token: this.token,
    });
    
    this.socket.on('welcome', msg => {
        console.log('Joined:', msg);
    });

    this.socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    const res = await fetch(`${this.BASE_URL}/users/@me`, {
      method: 'GET',
      headers: { 'Authorization': this.token }
    });

    if (!res.ok) throw new Error("Failed to fetch user data.");

    const data = await res.json();
    this.username = data.username;

    return { username: data.username };
  }

  public sendMessage(...args: Parameters<Message["sendMessage"]>) {
    return this.messageHandler.sendMessage(...args);
  }

  public getMessage(...args: Parameters<Message["getMessage"]>) {
    return this.messageHandler.getMessage(...args);
  }

  public deleteMessage(...args: Parameters<Message["deleteMessage"]>) {
    return this.messageHandler.deleteMessage(...args);
  }

  public getMessages() {
    return this.messageHandler.getMessages();
  }

  public sendMessageEmbed(...args: Parameters<Message["sendMessageEmbed"]>) {
    return this.messageHandler.sendMessageEmbed(...args);
  }
}
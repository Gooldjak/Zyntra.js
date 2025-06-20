import { Action, ActionType, MessageCreateAction, MessageDeleteAction, MessageBulkAction, MessageEmbedAction, MessageFetchAction } from "../Actions/Action";
import { io, Socket } from "socket.io-client";

export class Message {
  constructor(
    private BASE_URL: string,
    private token: string,
    private id: number,
    private emit: (type: ActionType, action: Action) => void,
    private socket: Socket,
  ) {}

  public async sendMessage(accessPoint: number, message: string) {
    const res = await fetch(`${this.BASE_URL}/channels/${accessPoint}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: message }),
    });

    if (!res.ok) {
      console.log("status:", res.status);
      console.log("body:", await res.text());
      throw new Error("Failed to send message");
    }

    const action: MessageCreateAction = {
      content: message,
      accessPoint,
      user: { id: this.id, token: this.token }
    };

    this.emit("messageCreate", action); 
  }

  public async sendMessageEmbed(accessPoint: number, message: string, title: string, description: string, color: string, image: string, footer: string) { 
    const res = await fetch(`${this.BASE_URL}/channels/${accessPoint}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: message, embed: {title: title, description: description, color: color, image: image, footer: footer } }),
    });

    if (!res.ok) {
      console.log("status:", res.status);
      console.log("body:", await res.text());
      throw new Error("Failed to send message");
    }

    const action: MessageEmbedAction = {
      accessPoint,
      title: title,
      description: description,
      color: color,
    };

    this.emit("messageEmbed", action);  
  }

  public async getMessage(accessPoint: number, messageid: number) {
    const res = await fetch(`${this.BASE_URL}/channels/${accessPoint}/messages/${messageid}`, {
      headers: { 'Authorization': `${this.token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch message");

    const data = await res.json();

    const action: MessageFetchAction = {
      accessPoint: accessPoint,
      messageId: messageid,
    };

    this.emit("messageFetch", action);  

    return data;
  }

  public async deleteMessage(accessPoint: number, messageid: number) {
    const res = await fetch(`${this.BASE_URL}/channels/${accessPoint}/messages/${messageid}`, {
      headers: { 'Authorization': `${this.token}` },
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Delete failed:", errorText);
      throw new Error("Failed to delete message");
    }

    const action: MessageDeleteAction = {
      accessPoint,
      messageId: messageid,
    };

    this.emit("messageDelete", action);
  }

  public async getMessages() {
    this.socket.on('messageReceived', msg => {
      console.log('Message:', msg);

      const action: MessageBulkAction = {
        from: msg.from,
        accessPoint: msg.channel,
        origin: msg.orgin,
        message: msg.message,
        messageId: msg.messageId,
      };

      this.emit("messageBulk", action);   
    });
  }
}
import { Action, ActionType, messagesendAction, messagegetAction, messagedeleteAction } from "../Actions/Action";

export class Message {
  constructor(
    private BASE_URL: string,
    private token: string,
    private id: number,
    private emit: (type: ActionType, action: Action) => void
  ) {}

  public async sendMessage(accessPoint: string, message: string) {
    const res = await fetch(`${this.BASE_URL}/channels/${accessPoint}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: message }),
    });

    if (!res.ok) throw new Error("Failed to send message");

    const action: messagesendAction = {
      content: message,
      accessPoint,
      user: { id: this.id, token: this.token }
    };

    this.emit("messagesent", action);
  }

  public async getMessage(accessPoint: string, messageid: string) {
    const res = await fetch(`${this.BASE_URL}/channels/${accessPoint}/messages/${messageid}`, {
      headers: { 'Authorization': `${this.token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch message");

    const data = await res.json();

    const action: messagegetAction = {
      accessPoint,
      messageid,
    };

    this.emit("messageget", action);

    return data;
  }

  public async deleteMessage(accessPoint: string, messageid: string) {
    const res = await fetch(`${this.BASE_URL}/channels/${accessPoint}/messages/${messageid}`, {
      headers: { 'Authorization': `${this.token}` },
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Delete failed:", errorText);
      throw new Error("Failed to delete message");
    }

    const action: messagedeleteAction = {
      accessPoint,
      messageid,
    };

    this.emit("messagedelete", action);
  }
}
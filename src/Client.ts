import { Action, ActionType, readyAction } from "./Actions/Action";

export class Client {
  private token: string;
  private id: number;
  private events = new Map<ActionType, (action: Action) => void>();

  constructor(token: string, id: number) {
    if (!token || typeof token !== 'string') {
        throw new Error("Token is required and must be a string.");
    }

    if (typeof id !== 'number' || isNaN(id)) {
        throw new Error("ID is required and must be a valid number.");
    }

    this.token = token;
    this.id = id;
  }

  public on(actionType: ActionType, callback: (action: Action) => void) {
    this.events.set(actionType, callback);
  }
}
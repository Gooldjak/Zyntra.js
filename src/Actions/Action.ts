import { User } from './Client';
export type ActionType = "ready" | "messagesent" | "messagedelete" | "messageget";

export interface Action {}

export interface readyAction extends Action {
  // to do
}

export interface messagesendAction extends Action {
  content: string;
  accessPoint: number;
  user: User;
}

export interface messagedeleteAction extends Action { 
  accessPoint: number;
  messageid: number;
}

export interface messagegetAction extends Action {
  accessPoint: number;
  messageid: number;
}

import { User } from './Client';
export type ActionType = "ready" | "messagesent" | "messagedelete" | "messageget";

export interface Action {}

export interface readyAction extends Action {
  // to do
}

export interface messagesendAction extends Action {
  content: string;
  accessPoint: string;
  user: User;
}

export interface messagedeleteAction extends Action { 
  accessPoint: string;
  messageid: string;
}

export interface messagegetAction extends Action {
  accessPoint: string;
  messageid: string;
}

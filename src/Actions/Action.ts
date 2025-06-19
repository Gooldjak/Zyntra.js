import { User } from './Client';
export type ActionType = "ready" | "messagesent" | "messagedelete" | "messageget" | "messagesget" | "messagesentembed";

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

export interface getmessagesAction extends Action {
  
}

export interface messagesendembedAction extends Action { 
  accessPoint: number;
  title: string;
  description: string;
  color: string;
}
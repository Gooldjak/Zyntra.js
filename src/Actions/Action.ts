import { User } from './Client';
export type ActionType =
  | "ready"
  | "messageCreate"
  | "messageDelete"
  | "messageFetch"
  | "messageBulk"
  | "messageEmbed";


export interface Action {}

export interface readyAction extends Action {
  // to do
}

export interface MessageCreateAction extends Action {
  content: string;
  accessPoint: number;
  user: User;
}

export interface MessageDeleteAction extends Action {
  accessPoint: number;
  messageId: number;
}

export interface MessageFetchAction extends Action {
  accessPoint: number;
  messageId: number;
}

export interface MessageBulkAction extends Action {
  from: number;
  accessPoint: number;
  origin: number;
  message: string;
  messageId: number;
}

export interface MessageEmbedAction extends Action {
  accessPoint: number;
  title: string;
  description: string;
  color: string;
}

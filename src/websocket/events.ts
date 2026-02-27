import { ApiComment, ApiImage } from "../api";
import { Level, SocketResponse } from "./general";

export type SubscriptionChannel =
  | `images:*`
  | `users:${number}:images`
  | `images:${number}`;

export interface ServerToClientEvents {
  welcome: (payload: {
    userId: number;
    username: string;
    level: Level;
  }) => void;
  error: (message: string) => void;

  "share:count": (payload: { shareId: number; count: number }) => void;

  "image:update": (payload: { id: number } & Partial<ApiImage>) => void;
  "image:delete": (payload: { id: number }) => void;

  "comment:create": (payload: ApiComment) => void;
  "comment:delete": (payload: { id: number }) => void;
  "comment:update": (payload: { id: number } & Partial<ApiComment>) => void;
}

export interface ClientToServerEvents {
  ping: (callback: () => void) => void;
  subscribe: (
    intent: SubscriptionChannel,
    callback?: (response: SocketResponse) => void,
  ) => void;
  unsubscribe: (
    intent: SubscriptionChannel,
    callback?: (response: SocketResponse) => void,
  ) => void;

  "share:join": (
    shareId: number,
    callback?: (response: SocketResponse) => void,
  ) => void;
  "share:leave": (
    shareId: number,
    callback?: (response: SocketResponse) => void,
  ) => void;

  "image:update": (payload: {
    exclude?: string[];
    rooms: string[];
    data: { id: number } & Partial<ApiImage>;
  }) => void;
  "image:delete": (payload: {
    exclude?: string[];
    rooms: string[];
    data: { id: number };
  }) => void;

  "comment:create": (payload: {
    exclude?: string[];
    rooms: string[];
    data: ApiComment;
  }) => void;
  "comment:delete": (payload: {
    exclude?: string[];
    rooms: string[];
    data: { id: number };
  }) => void;
  "comment:update": (payload: {
    exclude?: string[];
    rooms: string[];
    data: { id: number } & Partial<ApiComment>;
  }) => void;
}

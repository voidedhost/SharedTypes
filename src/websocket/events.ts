import { ApiComment, ApiImage, ApiLike, ApiUser } from "../api";
import { WebSocketLevel, WebSocketResponse } from "./general";

export type WebSocketSubscriptionChannel =
  | `images:*`
  | `users:${number}:images`
  | `images:${number}`
  | `comments:*`
  | `images:${number}:comments`
  | `comments:${number}`
  | `users:*`
  | `users:${number}`
  | `users:${number}:comments`
  | `users:${number}:likes`;

export interface WebSocketServerToClientEvents {
  welcome: (payload: {
    userId: number;
    username: string;
    level: WebSocketLevel;
  }) => void;
  error: (message: string) => void;

  "share:count": (payload: { shareId: number; count: number }) => void;

  "image:update": (payload: { id: number } & Partial<ApiImage>) => void;
  "image:delete": (payload: { id: number }) => void;

  "comment:create": (payload: ApiComment) => void;
  "comment:delete": (payload: { id: number }) => void;
  "comment:update": (payload: { id: number } & Partial<ApiComment>) => void;

  "user:update": (payload: { id: number } & Partial<ApiUser>) => void;

  "like:create": (payload: ApiLike) => void;
  "like:delete": (payload: { id: number }) => void;
}

export interface WebSocketClientToServerEvents {
  ping: (callback: () => void) => void;
  subscribe: (
    intent: WebSocketSubscriptionChannel,
    callback?: (response: WebSocketResponse) => void,
  ) => void;
  unsubscribe: (
    intent: WebSocketSubscriptionChannel,
    callback?: (response: WebSocketResponse) => void,
  ) => void;

  "share:join": (
    shareId: number,
    callback?: (response: WebSocketResponse) => void,
  ) => void;
  "share:leave": (
    shareId: number,
    callback?: (response: WebSocketResponse) => void,
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

  "user:update": (payload: {
    exclude?: string[];
    rooms: string[];
    data: { id: number } & Partial<ApiUser>;
  }) => void;

  "like:create": (payload: {
    exclude?: string[];
    rooms: string[];
    data: ApiLike;
  }) => void;
  "like:delete": (payload: {
    exclude?: string[];
    rooms: string[];
    data: { id: number };
  }) => void;
}

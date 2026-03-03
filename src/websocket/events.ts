import { ApiComment, ApiDomain, ApiImage, ApiLike, ApiUser } from "../api";
import { PartialStructure } from "../universal";
import {
  WebSocketClientToServerEventMasterBasePayload,
  WebSocketLevel,
  WebSocketResponse,
} from "./general";

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
  | `users:${number}:likes`
  | `likes:*`
  | `likes:${number}`
  | `domains:*`
  | `domains:${number}`;

export interface WebSocketServerToClientEvents {
  welcome: (payload: {
    userId: number;
    username: string;
    level: WebSocketLevel;
  }) => void;
  error: (message: string) => void;

  "share:count": (payload: { shareId: number; count: number }) => void;

  "image:update": (payload: PartialStructure<ApiImage>) => void;
  "image:delete": (payload: { id: number }) => void;

  "comment:create": (payload: ApiComment) => void;
  "comment:delete": (payload: { id: number }) => void;
  "comment:update": (payload: PartialStructure<ApiComment>) => void;

  "user:update": (payload: PartialStructure<ApiUser>) => void;

  "like:create": (payload: ApiLike) => void;
  "like:delete": (payload: { id: number }) => void;

  "domain:update": (payload: PartialStructure<ApiDomain>) => void;
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

  "image:update": (
    payload: WebSocketClientToServerEventMasterBasePayload<
      PartialStructure<ApiImage>
    >,
  ) => void;
  "image:delete": (
    payload: WebSocketClientToServerEventMasterBasePayload<{ id: number }>,
  ) => void;

  "comment:create": (
    payload: WebSocketClientToServerEventMasterBasePayload<ApiComment>,
  ) => void;
  "comment:delete": (
    payload: WebSocketClientToServerEventMasterBasePayload<{ id: number }>,
  ) => void;
  "comment:update": (
    payload: WebSocketClientToServerEventMasterBasePayload<
      PartialStructure<ApiComment>
    >,
  ) => void;

  "user:update": (
    payload: WebSocketClientToServerEventMasterBasePayload<
      PartialStructure<ApiUser>
    >,
  ) => void;

  "like:create": (
    payload: WebSocketClientToServerEventMasterBasePayload<ApiLike>,
  ) => void;
  "like:delete": (
    payload: WebSocketClientToServerEventMasterBasePayload<{ id: number }>,
  ) => void;

  "domain:update": (
    payload: WebSocketClientToServerEventMasterBasePayload<
      PartialStructure<ApiDomain>
    >,
  ) => void;
}

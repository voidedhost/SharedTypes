export enum Level {
  GUEST = 1,
  USER = 2,
  MASTER = 3,
}

export type SocketResponse<T = void> = [T] extends [void]
  ? { success: true } | { success: false; error: string }
  : { success: true; data: T } | { success: false; error: string };

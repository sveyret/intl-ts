type MessageDirect = string
type MessageParams<P1, P2, P3, P4, P5, P6> = (arg1: P1, arg2: P2, arg3: P3, arg4: P4, arg5: P5, arg6: P6) => string

/**
 * A message seen as function.
 */
export type MessageFunction<T extends MessageDirect | MessageParams<any, any, any, any, any, any>> = T extends string
  ? () => string
  : T

/**
 * The available messages for a given language.
 */
export interface Messages {
  [key: string]: MessageDirect | MessageParams<any, any, any, any, any, any>
}

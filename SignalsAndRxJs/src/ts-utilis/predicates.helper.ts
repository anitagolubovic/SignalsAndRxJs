import { Maybe } from "./maybe.type";

export function isDefined<T>(x: Maybe<T>): x is T {
  return x != null;
}

export function isNotDefined<T>(x: Maybe<T>): x is null | undefined {
  return x == null;
}
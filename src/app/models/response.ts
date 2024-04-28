import { Hero } from "./hero";

export interface Response {
  code: number,
  result: Array<Hero> | Hero | string
}
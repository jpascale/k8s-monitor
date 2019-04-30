export interface Task {
  execute: (params: { [k: string]: any }, cb: (result: boolean) => any) => any;
}
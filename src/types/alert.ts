export interface Alert {
  execute: (params: { [k: string]: any }, cb: (result: boolean) => any) => any;
  restablish: (params: { [k: string]: any }, cb: (result: boolean) => any) => any;
}
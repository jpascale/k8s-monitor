export interface TaskConfig {
  name: string;
  type: string,
  params: { [k: string]: any },
  interval: string
}

export interface AlertConfig {
  type: string,
  params: { [k: string]: any }
}

export interface Item {
  name: string;
  tasks: TaskConfig[],
  alerts: AlertConfig[]
}

export interface Config {
  pluginDir?: string,
  config: Item[];
}
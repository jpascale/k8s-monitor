export interface ConfigTask {
  name: string;
  type: string,
  params: { [k: string]: any },
  interval: string
}

export interface ConfigAlert {
  type: string,
  params: { [k: string]: any }
}

export interface Item {
  name: string;
  tasks: ConfigTask[],
  alerts: ConfigAlert[]
}

export interface Config {
  pluginDir?: string,
  config: Item[];
}
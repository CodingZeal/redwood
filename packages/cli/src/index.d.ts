declare namespace NodeJS {
  interface Global {
    __dirname: string
  }
}

export enum Database {
  SQLITE,
  POSTGRES,
}

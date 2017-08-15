export interface Options {
  filePath: string;
}

export function readArguments(yargv: any): Options {
  return {
    filePath: yargv.t,
  };
}

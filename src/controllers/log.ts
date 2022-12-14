
export function error(msg: string, err: Error) {
  console.error(msg);
  console.error(err);
}

export function system(msg: string) {
  console.log(msg);
}
export function decodeJwt(token: string) {
  const payloadBase64 = token.split(".")[1];
  const payload = atob(payloadBase64);
  return JSON.parse(payload);
}

export function getExpirationDate(timestamp: number) {
  const expiresInSeconds = timestamp - Math.floor(Date.now() / 1000);
  return expiresInSeconds / (60 * 60 * 24);
}

export function isInFuture(date: Date): boolean {
  return date.getTime() > Date.now();
}

export function fromUnix(unixTimestamp: number): Date {
  return new Date(unixTimestamp * 1000);
}

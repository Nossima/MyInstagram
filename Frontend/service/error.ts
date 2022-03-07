export interface Error {
  key: string,
  message: string
}

export const error = (key: string, message: string): Error => ({
  key,
  message
});

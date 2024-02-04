import { httpAPI } from "@config";

export function formatImage(path: string) {
  return `${httpAPI}/${path}`;
}

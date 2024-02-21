import { httpAPI } from "@config";

export function formatImage(path: any) {
  return `${httpAPI}/${path}`;
}

import { httpAPI } from "@config";

export default function FormatImage(path: string) {
  return `${httpAPI}/${path}`;
}

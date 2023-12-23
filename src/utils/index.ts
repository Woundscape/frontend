import { IFormattedErrorResponse } from "@constraint/constraint";
import { AxiosError, isAxiosError } from "axios";

export function formattedError(
  error: AxiosError<IFormattedErrorResponse> | unknown
): IFormattedErrorResponse {
  if (isAxiosError(error)) {
    const response = error.response;
    if (response) {
      const { message, info } = response.data;
      const infoMessage = info?.message ?? '';

      return {
        message,
        infoMessage,
        status: response.status,
        statusText: response.statusText,
      };
    }
  }
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }
  return {
    message: 'error',
  };
}
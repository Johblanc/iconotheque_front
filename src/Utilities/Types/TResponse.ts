
/**
 * Format de réponse de l'API
 */
export type TResponse<Data> = {
  statusCode : number,
  message: string | string [];
  data: Data;
};
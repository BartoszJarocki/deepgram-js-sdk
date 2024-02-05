import { AbstractRestfulClient } from "./AbstractRestfulClient";
import type {
  CreateOnPremCredentialsSchema,
  DeepgramResponse,
  ListOnPremCredentialsResponse,
  MessageResponse,
  OnPremCredentialResponse,
} from "../lib/types";
export declare class OnPremClient extends AbstractRestfulClient {
  /**
   * @see https://developers.deepgram.com/reference/list-credentials
   */
  listCredentials(
    projectId: string,
    endpoint?: string
  ): Promise<DeepgramResponse<ListOnPremCredentialsResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/get-credentials
   */
  getCredentials(
    projectId: string,
    credentialsId: string,
    endpoint?: string
  ): Promise<DeepgramResponse<OnPremCredentialResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/create-credentials
   */
  createCredentials(
    projectId: string,
    options: CreateOnPremCredentialsSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<OnPremCredentialResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/delete-credentials
   */
  deleteCredentials(
    projectId: string,
    credentialsId: string,
    endpoint?: string
  ): Promise<DeepgramResponse<MessageResponse>>;
}
//# sourceMappingURL=OnPremClient.d.ts.map

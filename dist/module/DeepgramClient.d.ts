import { AbstractClient } from "./packages/AbstractClient";
import { ListenClient } from "./packages/ListenClient";
import { ManageClient } from "./packages/ManageClient";
import { OnPremClient } from "./packages/OnPremClient";
import { ReadClient } from "./packages/ReadClient";
/**
 * Deepgram Client.
 *
 * An isomorphic Javascript client for interacting with the Deepgram API.
 * @see https://developers.deepgram.com/docs/js-sdk
 */
export default class DeepgramClient extends AbstractClient {
  get listen(): ListenClient;
  get manage(): ManageClient;
  get onprem(): OnPremClient;
  get read(): ReadClient;
  /**
   * Major version fallback errors are below
   *
   * @see https://developers.deepgram.com/docs/js-sdk-v2-to-v3-migration-guide
   */
  get transcription(): any;
  get projects(): any;
  get keys(): any;
  get members(): any;
  get scopes(): any;
  get invitation(): any;
  get usage(): any;
  get billing(): any;
}
//# sourceMappingURL=DeepgramClient.d.ts.map

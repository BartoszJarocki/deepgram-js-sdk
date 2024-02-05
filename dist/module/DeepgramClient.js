import { DeepgramVersionError } from "./lib/errors";
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
  get listen() {
    return new ListenClient(this.key, this.options);
  }
  get manage() {
    return new ManageClient(this.key, this.options);
  }
  get onprem() {
    return new OnPremClient(this.key, this.options);
  }
  get read() {
    return new ReadClient(this.key, this.options);
  }
  /**
   * Major version fallback errors are below
   *
   * @see https://developers.deepgram.com/docs/js-sdk-v2-to-v3-migration-guide
   */
  get transcription() {
    throw new DeepgramVersionError();
  }
  get projects() {
    throw new DeepgramVersionError();
  }
  get keys() {
    throw new DeepgramVersionError();
  }
  get members() {
    throw new DeepgramVersionError();
  }
  get scopes() {
    throw new DeepgramVersionError();
  }
  get invitation() {
    throw new DeepgramVersionError();
  }
  get usage() {
    throw new DeepgramVersionError();
  }
  get billing() {
    throw new DeepgramVersionError();
  }
}
//# sourceMappingURL=DeepgramClient.js.map

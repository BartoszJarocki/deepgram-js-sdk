"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./lib/errors");
const AbstractClient_1 = require("./packages/AbstractClient");
const ListenClient_1 = require("./packages/ListenClient");
const ManageClient_1 = require("./packages/ManageClient");
const OnPremClient_1 = require("./packages/OnPremClient");
const ReadClient_1 = require("./packages/ReadClient");
/**
 * Deepgram Client.
 *
 * An isomorphic Javascript client for interacting with the Deepgram API.
 * @see https://developers.deepgram.com/docs/js-sdk
 */
class DeepgramClient extends AbstractClient_1.AbstractClient {
  get listen() {
    return new ListenClient_1.ListenClient(this.key, this.options);
  }
  get manage() {
    return new ManageClient_1.ManageClient(this.key, this.options);
  }
  get onprem() {
    return new OnPremClient_1.OnPremClient(this.key, this.options);
  }
  get read() {
    return new ReadClient_1.ReadClient(this.key, this.options);
  }
  /**
   * Major version fallback errors are below
   *
   * @see https://developers.deepgram.com/docs/js-sdk-v2-to-v3-migration-guide
   */
  get transcription() {
    throw new errors_1.DeepgramVersionError();
  }
  get projects() {
    throw new errors_1.DeepgramVersionError();
  }
  get keys() {
    throw new errors_1.DeepgramVersionError();
  }
  get members() {
    throw new errors_1.DeepgramVersionError();
  }
  get scopes() {
    throw new errors_1.DeepgramVersionError();
  }
  get invitation() {
    throw new errors_1.DeepgramVersionError();
  }
  get usage() {
    throw new errors_1.DeepgramVersionError();
  }
  get billing() {
    throw new errors_1.DeepgramVersionError();
  }
}
exports.default = DeepgramClient;
//# sourceMappingURL=DeepgramClient.js.map

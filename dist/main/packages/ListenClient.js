"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenClient = void 0;
const AbstractClient_1 = require("./AbstractClient");
const LiveClient_1 = require("./LiveClient");
const PrerecordedClient_1 = require("./PrerecordedClient");
class ListenClient extends AbstractClient_1.AbstractClient {
  get prerecorded() {
    return new PrerecordedClient_1.PrerecordedClient(this.key, this.options);
  }
  live(transcriptionOptions, endpoint = "v1/listen") {
    return new LiveClient_1.LiveClient(this.key, this.options, transcriptionOptions, endpoint);
  }
}
exports.ListenClient = ListenClient;
//# sourceMappingURL=ListenClient.js.map

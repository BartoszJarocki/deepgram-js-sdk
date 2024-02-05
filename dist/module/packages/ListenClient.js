import { AbstractClient } from "./AbstractClient";
import { LiveClient } from "./LiveClient";
import { PrerecordedClient } from "./PrerecordedClient";
export class ListenClient extends AbstractClient {
  get prerecorded() {
    return new PrerecordedClient(this.key, this.options);
  }
  live(transcriptionOptions, endpoint = "v1/listen") {
    return new LiveClient(this.key, this.options, transcriptionOptions, endpoint);
  }
}
//# sourceMappingURL=ListenClient.js.map

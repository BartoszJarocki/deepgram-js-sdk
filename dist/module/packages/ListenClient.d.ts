import { AbstractClient } from "./AbstractClient";
import { LiveClient } from "./LiveClient";
import { LiveSchema } from "../lib/types";
import { PrerecordedClient } from "./PrerecordedClient";
export declare class ListenClient extends AbstractClient {
  get prerecorded(): PrerecordedClient;
  live(transcriptionOptions: LiveSchema, endpoint?: string): LiveClient;
}
//# sourceMappingURL=ListenClient.d.ts.map

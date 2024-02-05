/// <reference types="node" />
import { EventEmitter } from "events";
import { DeepgramClientOptions } from "../lib/types";
export declare abstract class AbstractWsClient extends EventEmitter {
  protected key: string;
  protected options: DeepgramClientOptions | undefined;
  protected baseUrl: URL;
  constructor(key: string, options?: DeepgramClientOptions | undefined);
}
//# sourceMappingURL=AbstractWsClient.d.ts.map

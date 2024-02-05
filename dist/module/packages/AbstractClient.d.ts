import { DeepgramClientOptions } from "../lib/types";
/**
 * Deepgram Client.
 *
 * An isomorphic Javascript client for interacting with the Deepgram API.
 * @see https://developers.deepgram.com
 */
export declare abstract class AbstractClient {
  protected key: string;
  protected options: DeepgramClientOptions;
  protected baseUrl: URL;
  constructor(key: string, options: DeepgramClientOptions);
  protected resolveBaseUrl(url: string): URL;
  protected willProxy(): boolean;
}
//# sourceMappingURL=AbstractClient.d.ts.map

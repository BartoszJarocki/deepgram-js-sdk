import { AbstractWsClient } from "./AbstractWsClient";
import { LiveConnectionState } from "../lib/enums";
import type { LiveSchema, LiveConfigOptions, DeepgramClientOptions } from "../lib/types";
export declare class LiveClient extends AbstractWsClient {
  protected key: string;
  protected options: DeepgramClientOptions | undefined;
  private transcriptionOptions;
  private _socket;
  constructor(
    key: string,
    options?: DeepgramClientOptions | undefined,
    transcriptionOptions?: LiveSchema,
    endpoint?: string
  );
  configure(config: LiveConfigOptions): void;
  keepAlive(): void;
  getReadyState(): LiveConnectionState;
  /**
   * Sends data to the Deepgram API via websocket connection
   * @param data Audio data to send to Deepgram
   *
   * Conforms to RFC #146 for Node.js - does not send an empty byte.
   * In the browser, a Blob will contain length with no audio.
   * @see https://github.com/deepgram/deepgram-python-sdk/issues/146
   */
  send(data: string | ArrayBufferLike | Blob): void;
  /**
   * Denote that you are finished sending audio and close
   * the websocket connection when transcription is finished
   */
  finish(): void;
}
//# sourceMappingURL=LiveClient.d.ts.map

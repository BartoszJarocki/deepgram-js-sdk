"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveClient = void 0;
const AbstractWsClient_1 = require("./AbstractWsClient");
const helpers_1 = require("../lib/helpers");
const errors_1 = require("../lib/errors");
const constants_1 = require("../lib/constants");
const enums_1 = require("../lib/enums");
const websocket_1 = require("websocket");
class LiveClient extends AbstractWsClient_1.AbstractWsClient {
  constructor(
    key,
    options = constants_1.DEFAULT_OPTIONS,
    transcriptionOptions = {},
    endpoint = "v1/listen"
  ) {
    super(key, options);
    this.key = key;
    this.options = options;
    this.transcriptionOptions = transcriptionOptions;
    const url = new URL(endpoint, this.baseUrl);
    url.protocol = url.protocol.toLowerCase().replace(/(http)(s)?/gi, "ws$2");
    (0, helpers_1.appendSearchParams)(url.searchParams, this.transcriptionOptions);
    this._socket = new websocket_1.w3cwebsocket(url.toString(), ["token", this.key]);
    this._socket.onopen = () => {
      this.emit(enums_1.LiveTranscriptionEvents.Open, this);
    };
    this._socket.onclose = (event) => {
      this.emit(enums_1.LiveTranscriptionEvents.Close, event);
    };
    this._socket.onerror = (event) => {
      this.emit(enums_1.LiveTranscriptionEvents.Error, event);
    };
    this._socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data.toString());
        if (data.type === enums_1.LiveTranscriptionEvents.Metadata) {
          this.emit(enums_1.LiveTranscriptionEvents.Metadata, data);
        }
        if (data.type === enums_1.LiveTranscriptionEvents.Transcript) {
          this.emit(enums_1.LiveTranscriptionEvents.Transcript, data);
        }
        if (data.type === enums_1.LiveTranscriptionEvents.UtteranceEnd) {
          this.emit(enums_1.LiveTranscriptionEvents.UtteranceEnd, data);
        }
        if (data.type === enums_1.LiveTranscriptionEvents.SpeechStarted) {
          this.emit(enums_1.LiveTranscriptionEvents.SpeechStarted, data);
        }
      } catch (error) {
        this.emit(enums_1.LiveTranscriptionEvents.Error, {
          event,
          message: "Unable to parse `data` as JSON.",
          error,
        });
      }
    };
  }
  configure(config) {
    this._socket.send(
      JSON.stringify({
        type: "Configure",
        processors: config,
      })
    );
  }
  keepAlive() {
    this._socket.send(
      JSON.stringify({
        type: "KeepAlive",
      })
    );
  }
  getReadyState() {
    return this._socket.readyState;
  }
  /**
   * Sends data to the Deepgram API via websocket connection
   * @param data Audio data to send to Deepgram
   *
   * Conforms to RFC #146 for Node.js - does not send an empty byte.
   * In the browser, a Blob will contain length with no audio.
   * @see https://github.com/deepgram/deepgram-python-sdk/issues/146
   */
  send(data) {
    if (this._socket.readyState === enums_1.LiveConnectionState.OPEN) {
      if (typeof data === "string") {
        this._socket.send(data); // send text data
      } else if (data instanceof Blob) {
        this._socket.send(data); // send blob data
      } else {
        const buffer = data;
        if (buffer.byteLength > 0) {
          this._socket.send(buffer); // send buffer when not zero-byte (or browser)
        } else {
          this.emit(
            enums_1.LiveTranscriptionEvents.Warning,
            "Zero-byte detected, skipping. Send `CloseStream` if trying to close the connection."
          );
        }
      }
    } else {
      throw new errors_1.DeepgramError("Could not send. Connection not open.");
    }
  }
  /**
   * Denote that you are finished sending audio and close
   * the websocket connection when transcription is finished
   */
  finish() {
    // tell the server to close the socket
    this._socket.send(
      JSON.stringify({
        type: "CloseStream",
      })
    );
  }
}
exports.LiveClient = LiveClient;
//# sourceMappingURL=LiveClient.js.map

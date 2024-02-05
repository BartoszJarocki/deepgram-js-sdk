var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { AbstractRestfulClient } from "./AbstractRestfulClient";
import { appendSearchParams, isFileSource, isUrlSource } from "../lib/helpers";
import { DeepgramError, isDeepgramError } from "../lib/errors";
export class PrerecordedClient extends AbstractRestfulClient {
  transcribeUrl(source, options, endpoint = "v1/listen") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let body;
        if (isUrlSource(source)) {
          body = JSON.stringify(source);
        } else {
          throw new DeepgramError("Unknown transcription source type");
        }
        if (options !== undefined && "callback" in options) {
          throw new DeepgramError(
            "Callback cannot be provided as an option to a synchronous transcription. Use `transcribeUrlCallback` or `transcribeFileCallback` instead."
          );
        }
        const transcriptionOptions = Object.assign({}, options);
        const url = new URL(endpoint, this.baseUrl);
        appendSearchParams(url.searchParams, transcriptionOptions);
        const result = yield this.post(this.fetch, url, body);
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  transcribeFile(source, options, endpoint = "v1/listen") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let body;
        if (isFileSource(source)) {
          body = source;
        } else {
          throw new DeepgramError("Unknown transcription source type");
        }
        if (options !== undefined && "callback" in options) {
          throw new DeepgramError(
            "Callback cannot be provided as an option to a synchronous transcription. Use `transcribeUrlCallback` or `transcribeFileCallback` instead."
          );
        }
        const transcriptionOptions = Object.assign({}, options);
        const url = new URL(endpoint, this.baseUrl);
        appendSearchParams(url.searchParams, transcriptionOptions);
        const result = yield this.post(this.fetch, url, body, {
          "Content-Type": "deepgram/audio+video",
        });
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  transcribeUrlCallback(source, callback, options, endpoint = "v1/listen") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let body;
        if (isUrlSource(source)) {
          body = JSON.stringify(source);
        } else {
          throw new DeepgramError("Unknown transcription source type");
        }
        const transcriptionOptions = Object.assign(Object.assign({}, options), {
          callback: callback.toString(),
        });
        const url = new URL(endpoint, this.baseUrl);
        appendSearchParams(url.searchParams, transcriptionOptions);
        const result = yield this.post(this.fetch, url, body);
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  transcribeFileCallback(source, callback, options, endpoint = "v1/listen") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let body;
        if (isFileSource(source)) {
          body = source;
        } else {
          throw new DeepgramError("Unknown transcription source type");
        }
        const transcriptionOptions = Object.assign(Object.assign({}, options), {
          callback: callback.toString(),
        });
        const url = new URL(endpoint, this.baseUrl);
        appendSearchParams(url.searchParams, transcriptionOptions);
        const result = yield this.post(this.fetch, url, body, {
          "Content-Type": "deepgram/audio+video",
        });
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
}
//# sourceMappingURL=PrerecordedClient.js.map

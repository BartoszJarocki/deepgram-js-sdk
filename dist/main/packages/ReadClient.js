"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadClient = void 0;
const AbstractRestfulClient_1 = require("./AbstractRestfulClient");
const helpers_1 = require("../lib/helpers");
const errors_1 = require("../lib/errors");
class ReadClient extends AbstractRestfulClient_1.AbstractRestfulClient {
  analyzeUrl(source, options, endpoint = "v1/read") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let body;
        if ((0, helpers_1.isUrlSource)(source)) {
          body = JSON.stringify(source);
        } else {
          throw new errors_1.DeepgramError("Unknown source type");
        }
        if (options !== undefined && "callback" in options) {
          throw new errors_1.DeepgramError(
            "Callback cannot be provided as an option to a synchronous transcription. Use `analyzeUrlCallback` or `analyzeTextCallback` instead."
          );
        }
        const analyzeOptions = Object.assign({}, options);
        const url = new URL(endpoint, this.baseUrl);
        (0, helpers_1.appendSearchParams)(url.searchParams, analyzeOptions);
        const result = yield this.post(this.fetch, url, body);
        return { result, error: null };
      } catch (error) {
        if ((0, errors_1.isDeepgramError)(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  analyzeText(source, options, endpoint = "v1/read") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let body;
        if ((0, helpers_1.isTextSource)(source)) {
          body = JSON.stringify(source);
        } else {
          throw new errors_1.DeepgramError("Unknown source type");
        }
        if (options !== undefined && "callback" in options) {
          throw new errors_1.DeepgramError(
            "Callback cannot be provided as an option to a synchronous requests. Use `analyzeUrlCallback` or `analyzeTextCallback` instead."
          );
        }
        const analyzeOptions = Object.assign({}, options);
        const url = new URL(endpoint, this.baseUrl);
        (0, helpers_1.appendSearchParams)(url.searchParams, analyzeOptions);
        const result = yield this.post(this.fetch, url, body);
        return { result, error: null };
      } catch (error) {
        if ((0, errors_1.isDeepgramError)(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  analyzeUrlCallback(source, callback, options, endpoint = "v1/read") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let body;
        if ((0, helpers_1.isUrlSource)(source)) {
          body = JSON.stringify(source);
        } else {
          throw new errors_1.DeepgramError("Unknown source type");
        }
        const transcriptionOptions = Object.assign(Object.assign({}, options), {
          callback: callback.toString(),
        });
        const url = new URL(endpoint, this.baseUrl);
        (0, helpers_1.appendSearchParams)(url.searchParams, transcriptionOptions);
        const result = yield this.post(this.fetch, url, body);
        return { result, error: null };
      } catch (error) {
        if ((0, errors_1.isDeepgramError)(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  analyzeTextCallback(source, callback, options, endpoint = "v1/read") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let body;
        if ((0, helpers_1.isTextSource)(source)) {
          body = JSON.stringify(source);
        } else {
          throw new errors_1.DeepgramError("Unknown source type");
        }
        const transcriptionOptions = Object.assign(Object.assign({}, options), {
          callback: callback.toString(),
        });
        const url = new URL(endpoint, this.baseUrl);
        (0, helpers_1.appendSearchParams)(url.searchParams, transcriptionOptions);
        const result = yield this.post(this.fetch, url, body, {
          "Content-Type": "deepgram/audio+video",
        });
        return { result, error: null };
      } catch (error) {
        if ((0, errors_1.isDeepgramError)(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
}
exports.ReadClient = ReadClient;
//# sourceMappingURL=ReadClient.js.map

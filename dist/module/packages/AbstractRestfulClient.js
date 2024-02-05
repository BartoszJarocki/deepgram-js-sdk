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
import { DeepgramApiError, DeepgramError, DeepgramUnknownError } from "../lib/errors";
import { fetchWithAuth, resolveResponse } from "../lib/fetch";
import { AbstractClient } from "./AbstractClient";
import { isBrowser } from "../lib/helpers";
export class AbstractRestfulClient extends AbstractClient {
  constructor(key, options) {
    super(key, options);
    this.key = key;
    this.options = options;
    if (isBrowser() && !this._willProxy()) {
      throw new DeepgramError(
        "Due to CORS we are unable to support REST-based API calls to our API from the browser. Please consider using a proxy, and including a `restProxy: { url: ''}` in your Deepgram client options."
      );
    }
    if ("fetch" in options) {
      this.fetch = options.fetch;
    } else {
      this.fetch = fetchWithAuth(this.key);
    }
  }
  _getErrorMessage(err) {
    return err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
  }
  handleError(error, reject) {
    return __awaiter(this, void 0, void 0, function* () {
      const Res = yield resolveResponse();
      if (error instanceof Res) {
        error
          .json()
          .then((err) => {
            reject(new DeepgramApiError(this._getErrorMessage(err), error.status || 500));
          })
          .catch((err) => {
            reject(new DeepgramUnknownError(this._getErrorMessage(err), err));
          });
      } else {
        reject(new DeepgramUnknownError(this._getErrorMessage(error), error));
      }
    });
  }
  _getRequestParams(method, headers, parameters, body) {
    const fetchOptions = "fetchOptions" in this.options ? this.options.fetchOptions : {};
    const params = Object.assign(Object.assign({}, fetchOptions), {
      method,
      headers: Object.assign(Object.assign({}, fetchOptions.headers), headers) || {},
    });
    if (method === "GET") {
      return params;
    }
    params.body = body;
    params.duplex = "half";
    return Object.assign(Object.assign({}, params), parameters);
  }
  _handleRequest(fetcher, method, url, headers, parameters, body) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => {
        fetcher(url, this._getRequestParams(method, headers, parameters, body))
          .then((result) => {
            if (!result.ok) throw result;
            return result.json();
          })
          .then((data) => resolve(data))
          .catch((error) => this.handleError(error, reject));
      });
    });
  }
  get(fetcher, url, headers, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      return this._handleRequest(fetcher, "GET", url, headers, parameters);
    });
  }
  post(fetcher, url, body, headers, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      return this._handleRequest(fetcher, "POST", url, headers, parameters, body);
    });
  }
  put(fetcher, url, body, headers, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      return this._handleRequest(fetcher, "PUT", url, headers, parameters, body);
    });
  }
  patch(fetcher, url, body, headers, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      return this._handleRequest(fetcher, "PATCH", url, headers, parameters, body);
    });
  }
  delete(fetcher, url, headers, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      return this._handleRequest(fetcher, "DELETE", url, headers, parameters);
    });
  }
  _willProxy() {
    var _a;
    const proxyUrl = (_a = this.options.restProxy) === null || _a === void 0 ? void 0 : _a.url;
    return !!proxyUrl;
  }
}
//# sourceMappingURL=AbstractRestfulClient.js.map

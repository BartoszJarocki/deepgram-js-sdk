"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractClient = void 0;
const constants_1 = require("../lib/constants");
const errors_1 = require("../lib/errors");
const helpers_1 = require("../lib/helpers");
/**
 * Deepgram Client.
 *
 * An isomorphic Javascript client for interacting with the Deepgram API.
 * @see https://developers.deepgram.com
 */
class AbstractClient {
  constructor(key, options) {
    var _a, _b;
    this.key = key;
    this.options = options;
    this.key = key;
    if (!key) {
      this.key = process.env.DEEPGRAM_API_KEY;
    }
    if (!this.key) {
      throw new errors_1.DeepgramError("A deepgram API key is required");
    }
    this.options = (0, helpers_1.applySettingDefaults)(options, constants_1.DEFAULT_OPTIONS);
    if (!((_a = this.options.global) === null || _a === void 0 ? void 0 : _a.url)) {
      throw new errors_1.DeepgramError(
        `An API URL is required. It should be set to ${constants_1.DEFAULT_URL} by default. No idea what happened!`
      );
    }
    let baseUrlString = this.options.global.url;
    let proxyUrlString;
    /**
     * Check if the base URL provided is missing a protocol and warn in the console.
     */
    if (!baseUrlString.startsWith("http") && !baseUrlString.startsWith("ws")) {
      console.warn(
        `The base URL provided does not begin with http, https, ws, or wss and will default to https as standard.`
      );
    }
    /**
     * Applying proxy to base URL.
     */
    if ((_b = this.options.restProxy) === null || _b === void 0 ? void 0 : _b.url) {
      /**
       * Prevent client using a real API key when using a proxy configuration.
       */
      if (this.key !== "proxy") {
        throw new errors_1.DeepgramError(
          `Do not attempt to pass any other API key than the string "proxy" when making proxied REST requests. Please ensure your proxy application is responsible for writing our API key to the Authorization header.`
        );
      }
      proxyUrlString = this.options.restProxy.url;
      /**
       * Check if the proxy URL provided is missing a protocol and warn in the console.
       */
      if (!proxyUrlString.startsWith("http") && !proxyUrlString.startsWith("ws")) {
        console.warn(
          `The proxy URL provided does not begin with http, https, ws, or wss and will default to https as standard.`
        );
      }
      baseUrlString = proxyUrlString;
    }
    this.baseUrl = this.resolveBaseUrl(baseUrlString);
  }
  resolveBaseUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    return new URL((0, helpers_1.stripTrailingSlash)(url));
  }
  willProxy() {
    var _a;
    const proxyUrl = (_a = this.options.restProxy) === null || _a === void 0 ? void 0 : _a.url;
    return !!proxyUrl;
  }
}
exports.AbstractClient = AbstractClient;
//# sourceMappingURL=AbstractClient.js.map

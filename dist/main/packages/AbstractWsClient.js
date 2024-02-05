"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractWsClient = void 0;
const events_1 = require("events");
const constants_1 = require("../lib/constants");
const helpers_1 = require("../lib/helpers");
class AbstractWsClient extends events_1.EventEmitter {
  constructor(key, options = constants_1.DEFAULT_OPTIONS) {
    var _a;
    super();
    this.key = key;
    this.options = options;
    this.key = key;
    if (!key) {
      this.key = process.env.DEEPGRAM_API_KEY;
    }
    if (!this.key) {
      throw new Error("A deepgram API key is required");
    }
    this.options = (0, helpers_1.applySettingDefaults)(options, constants_1.DEFAULT_OPTIONS);
    if (!((_a = this.options.global) === null || _a === void 0 ? void 0 : _a.url)) {
      throw new Error(
        `An API URL is required. It should be set to ${constants_1.DEFAULT_URL} by default. No idea what happened!`
      );
    }
    let url = this.options.global.url;
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    this.baseUrl = new URL((0, helpers_1.stripTrailingSlash)(url));
    this.baseUrl.protocol = this.baseUrl.protocol.toLowerCase().replace(/(http)(s)?/gi, "ws$2");
  }
}
exports.AbstractWsClient = AbstractWsClient;
//# sourceMappingURL=AbstractWsClient.js.map

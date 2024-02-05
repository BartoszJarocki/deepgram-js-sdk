import { EventEmitter } from "events";
import { DEFAULT_OPTIONS, DEFAULT_URL } from "../lib/constants";
import { applySettingDefaults, stripTrailingSlash } from "../lib/helpers";
export class AbstractWsClient extends EventEmitter {
  constructor(key, options = DEFAULT_OPTIONS) {
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
    this.options = applySettingDefaults(options, DEFAULT_OPTIONS);
    if (!((_a = this.options.global) === null || _a === void 0 ? void 0 : _a.url)) {
      throw new Error(
        `An API URL is required. It should be set to ${DEFAULT_URL} by default. No idea what happened!`
      );
    }
    let url = this.options.global.url;
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    this.baseUrl = new URL(stripTrailingSlash(url));
    this.baseUrl.protocol = this.baseUrl.protocol.toLowerCase().replace(/(http)(s)?/gi, "ws$2");
  }
}
//# sourceMappingURL=AbstractWsClient.js.map

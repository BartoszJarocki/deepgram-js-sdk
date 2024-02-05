"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackUrl =
  exports.isFileSource =
  exports.isTextSource =
  exports.isUrlSource =
  exports.resolveHeadersConstructor =
  exports.appendSearchParams =
  exports.applySettingDefaults =
  exports.isServer =
  exports.isBrowser =
  exports.stripTrailingSlash =
    void 0;
const cross_fetch_1 = require("cross-fetch");
const deepmerge_1 = __importDefault(require("deepmerge"));
function stripTrailingSlash(url) {
  return url.replace(/\/$/, "");
}
exports.stripTrailingSlash = stripTrailingSlash;
const isBrowser = () => typeof window !== "undefined";
exports.isBrowser = isBrowser;
const isServer = () => typeof process !== "undefined";
exports.isServer = isServer;
function applySettingDefaults(options, defaults) {
  return (0, deepmerge_1.default)(defaults, options);
}
exports.applySettingDefaults = applySettingDefaults;
function appendSearchParams(searchParams, options) {
  Object.keys(options).forEach((i) => {
    if (Array.isArray(options[i])) {
      const arrayParams = options[i];
      arrayParams.forEach((param) => {
        searchParams.append(i, String(param));
      });
    } else {
      searchParams.append(i, String(options[i]));
    }
  });
}
exports.appendSearchParams = appendSearchParams;
const resolveHeadersConstructor = () => {
  if (typeof Headers === "undefined") {
    return cross_fetch_1.Headers;
  }
  return Headers;
};
exports.resolveHeadersConstructor = resolveHeadersConstructor;
const isUrlSource = (providedSource) => {
  if (providedSource.url) return true;
  return false;
};
exports.isUrlSource = isUrlSource;
const isTextSource = (providedSource) => {
  if (providedSource.text) return true;
  return false;
};
exports.isTextSource = isTextSource;
const isFileSource = (providedSource) => {
  if (isReadStreamSource(providedSource) || isBufferSource(providedSource)) return true;
  return false;
};
exports.isFileSource = isFileSource;
const isBufferSource = (providedSource) => {
  if (providedSource) return true;
  return false;
};
const isReadStreamSource = (providedSource) => {
  if (providedSource) return true;
  return false;
};
class CallbackUrl extends URL {
  constructor() {
    super(...arguments);
    this.callbackUrl = true;
  }
}
exports.CallbackUrl = CallbackUrl;
//# sourceMappingURL=helpers.js.map

import { Headers as CrossFetchHeaders } from "cross-fetch";
import merge from "deepmerge";
export function stripTrailingSlash(url) {
  return url.replace(/\/$/, "");
}
export const isBrowser = () => typeof window !== "undefined";
export const isServer = () => typeof process !== "undefined";
export function applySettingDefaults(options, defaults) {
  return merge(defaults, options);
}
export function appendSearchParams(searchParams, options) {
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
export const resolveHeadersConstructor = () => {
  if (typeof Headers === "undefined") {
    return CrossFetchHeaders;
  }
  return Headers;
};
export const isUrlSource = (providedSource) => {
  if (providedSource.url) return true;
  return false;
};
export const isTextSource = (providedSource) => {
  if (providedSource.text) return true;
  return false;
};
export const isFileSource = (providedSource) => {
  if (isReadStreamSource(providedSource) || isBufferSource(providedSource)) return true;
  return false;
};
const isBufferSource = (providedSource) => {
  if (providedSource) return true;
  return false;
};
const isReadStreamSource = (providedSource) => {
  if (providedSource) return true;
  return false;
};
export class CallbackUrl extends URL {
  constructor() {
    super(...arguments);
    this.callbackUrl = true;
  }
}
//# sourceMappingURL=helpers.js.map

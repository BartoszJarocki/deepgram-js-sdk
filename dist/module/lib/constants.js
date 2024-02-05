import { isBrowser } from "./helpers";
import { version } from "./version";
export const DEFAULT_HEADERS = {
  "Content-Type": `application/json`,
  "X-Client-Info": `@deepgram/sdk; ${isBrowser() ? "browser" : "server"}; v${version}`,
  "User-Agent": `@deepgram/sdk/${version}`,
};
export const DEFAULT_URL = "api.deepgram.com";
export const DEFAULT_GLOBAL_OPTIONS = {
  url: DEFAULT_URL,
};
export const DEFAULT_FETCH_OPTIONS = {
  headers: DEFAULT_HEADERS,
};
export const DEFAULT_OPTIONS = {
  global: DEFAULT_GLOBAL_OPTIONS,
  fetchOptions: DEFAULT_FETCH_OPTIONS,
};
//# sourceMappingURL=constants.js.map

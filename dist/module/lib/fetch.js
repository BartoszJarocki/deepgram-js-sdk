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
import crossFetch from "cross-fetch";
import { resolveHeadersConstructor } from "./helpers";
export const resolveFetch = () => {
  let _fetch;
  if (typeof fetch === "undefined") {
    _fetch = crossFetch;
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
export const fetchWithAuth = (apiKey) => {
  const fetch = resolveFetch();
  const HeadersConstructor = resolveHeadersConstructor();
  return (input, init) =>
    __awaiter(void 0, void 0, void 0, function* () {
      let headers = new HeadersConstructor(
        init === null || init === void 0 ? void 0 : init.headers
      );
      if (!headers.has("Authorization")) {
        headers.set("Authorization", `Token ${apiKey}`);
      }
      return fetch(input, Object.assign(Object.assign({}, init), { headers }));
    });
};
export const resolveResponse = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (typeof Response === "undefined") {
      return (yield import("cross-fetch")).Response;
    }
    return Response;
  });
//# sourceMappingURL=fetch.js.map

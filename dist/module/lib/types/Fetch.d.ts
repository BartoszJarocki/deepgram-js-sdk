export declare type Fetch = typeof fetch;
export interface FetchOptions {
  method?: RequestMethodType;
  headers?: Record<string, string>;
  cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached";
  credentials?: "include" | "same-origin" | "omit";
  redirect?: "manual" | "follow" | "error";
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
}
export declare type RequestMethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export interface FetchParameters {
  /**
   * Pass in an AbortController's signal to cancel the request.
   */
  signal?: AbortSignal;
}
//# sourceMappingURL=Fetch.d.ts.map

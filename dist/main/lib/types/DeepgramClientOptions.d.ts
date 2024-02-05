import { Fetch, FetchOptions } from "./Fetch";
declare type BaseOptions = {
  global?: {
    headers?: Record<string, string>;
    url?: string;
  };
  restProxy?: {
    url: null | string;
  };
};
declare type FetchOptionsProvided = BaseOptions & {
  fetchOptions: FetchOptions;
};
declare type FetchProvided = BaseOptions & {
  fetch: Fetch;
};
export declare type DeepgramClientOptions = FetchOptionsProvided | FetchProvided;
export {};
//# sourceMappingURL=DeepgramClientOptions.d.ts.map

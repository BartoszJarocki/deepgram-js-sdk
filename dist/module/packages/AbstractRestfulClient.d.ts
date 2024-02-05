/// <reference types="node" />
/// <reference types="node" />
import { Readable } from "stream";
import type { Fetch, FetchParameters, RequestMethodType } from "../lib/types/Fetch";
import { AbstractClient } from "./AbstractClient";
import { DeepgramClientOptions } from "../lib/types";
export declare abstract class AbstractRestfulClient extends AbstractClient {
  protected key: string;
  protected options: DeepgramClientOptions;
  protected fetch: Fetch;
  constructor(key: string, options: DeepgramClientOptions);
  protected _getErrorMessage(err: any): string;
  protected handleError(error: unknown, reject: (reason?: any) => void): Promise<void>;
  protected _getRequestParams(
    method: RequestMethodType,
    headers?: Record<string, string>,
    parameters?: FetchParameters,
    body?: string | Buffer | Readable
  ): {
    [k: string]: any;
  };
  protected _handleRequest(
    fetcher: Fetch,
    method: RequestMethodType,
    url: string | URL,
    headers?: Record<string, string>,
    parameters?: FetchParameters,
    body?: string | Buffer | Readable
  ): Promise<any>;
  protected get(
    fetcher: Fetch,
    url: string | URL,
    headers?: Record<string, string>,
    parameters?: FetchParameters
  ): Promise<any>;
  protected post(
    fetcher: Fetch,
    url: string | URL,
    body: string | Buffer | Readable,
    headers?: Record<string, string>,
    parameters?: FetchParameters
  ): Promise<any>;
  protected put(
    fetcher: Fetch,
    url: string | URL,
    body: string | Buffer | Readable,
    headers?: Record<string, string>,
    parameters?: FetchParameters
  ): Promise<any>;
  protected patch(
    fetcher: Fetch,
    url: string | URL,
    body: string | Buffer | Readable,
    headers?: Record<string, string>,
    parameters?: FetchParameters
  ): Promise<any>;
  protected delete(
    fetcher: Fetch,
    url: string | URL,
    headers?: Record<string, string>,
    parameters?: FetchParameters
  ): Promise<any>;
  private _willProxy;
}
//# sourceMappingURL=AbstractRestfulClient.d.ts.map

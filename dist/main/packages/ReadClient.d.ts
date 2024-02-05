import { AbstractRestfulClient } from "./AbstractRestfulClient";
import { CallbackUrl } from "../lib/helpers";
import type {
  AnalyzeSchema,
  AsyncAnalyzeResponse,
  DeepgramResponse,
  SyncAnalyzeResponse,
  TextSource,
  UrlSource,
} from "../lib/types";
export declare class ReadClient extends AbstractRestfulClient {
  analyzeUrl(
    source: UrlSource,
    options?: AnalyzeSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<SyncAnalyzeResponse>>;
  analyzeText(
    source: TextSource,
    options?: AnalyzeSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<SyncAnalyzeResponse>>;
  analyzeUrlCallback(
    source: UrlSource,
    callback: CallbackUrl,
    options?: AnalyzeSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<AsyncAnalyzeResponse>>;
  analyzeTextCallback(
    source: TextSource,
    callback: CallbackUrl,
    options?: AnalyzeSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<AsyncAnalyzeResponse>>;
}
//# sourceMappingURL=ReadClient.d.ts.map

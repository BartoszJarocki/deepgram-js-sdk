import { AbstractRestfulClient } from "./AbstractRestfulClient";
import { CallbackUrl } from "../lib/helpers";
import type {
  AsyncPrerecordedResponse,
  DeepgramResponse,
  FileSource,
  PrerecordedSchema,
  SyncPrerecordedResponse,
  UrlSource,
} from "../lib/types";
export declare class PrerecordedClient extends AbstractRestfulClient {
  transcribeUrl(
    source: UrlSource,
    options?: PrerecordedSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<SyncPrerecordedResponse>>;
  transcribeFile(
    source: FileSource,
    options?: PrerecordedSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<SyncPrerecordedResponse>>;
  transcribeUrlCallback(
    source: UrlSource,
    callback: CallbackUrl,
    options?: PrerecordedSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<AsyncPrerecordedResponse>>;
  transcribeFileCallback(
    source: FileSource,
    callback: CallbackUrl,
    options?: PrerecordedSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<AsyncPrerecordedResponse>>;
}
//# sourceMappingURL=PrerecordedClient.d.ts.map

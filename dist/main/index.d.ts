import DeepgramClient from "./DeepgramClient";
import type { DeepgramClientOptions } from "./lib/types";
/**
 * Major version fallback error
 */
declare class Deepgram {
  protected apiKey: string;
  protected apiUrl?: string | undefined;
  protected requireSSL?: boolean | undefined;
  constructor(apiKey: string, apiUrl?: string | undefined, requireSSL?: boolean | undefined);
}
/**
 * Creates a new Deepgram Client.
 */
declare const createClient: (apiKey: string, options: DeepgramClientOptions) => DeepgramClient;
export { createClient, DeepgramClient, Deepgram };
/**
 * Helpful exports.
 */
export * from "./packages";
export * from "./lib/types";
export * from "./lib/enums";
export * from "./lib/constants";
export * from "./lib/errors";
export * from "./lib/helpers";
/**
 * Captions. These will be tree-shaken if unused.
 *
 * @see https://github.com/deepgram/deepgram-node-captions
 *
 * import/export declarations don't do anything but set up an alias to the
 * exported variable, they do not count as a "use". Given their semantics,
 * they are tracked specially by any bundler and will not adversely affect
 * tree-shaking.
 */
export { webvtt, srt } from "@deepgram/captions";
//# sourceMappingURL=index.d.ts.map

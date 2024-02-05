import type { Fetch } from "./types/Fetch";
export declare const resolveFetch: () => Fetch;
export declare const fetchWithAuth: (apiKey: string) => Fetch;
export declare const resolveResponse: () => Promise<{
  new (body?: BodyInit | null | undefined, init?: ResponseInit | undefined): Response;
  prototype: Response;
  error(): Response;
  redirect(url: string | URL, status?: number | undefined): Response;
}>;
//# sourceMappingURL=fetch.d.ts.map

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
import { AbstractRestfulClient } from "./AbstractRestfulClient";
import { isDeepgramError } from "../lib/errors";
export class OnPremClient extends AbstractRestfulClient {
  /**
   * @see https://developers.deepgram.com/reference/list-credentials
   */
  listCredentials(projectId, endpoint = "v1/projects/:projectId/onprem/distribution/credentials") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId);
        const result = yield this.get(this.fetch, url);
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * @see https://developers.deepgram.com/reference/get-credentials
   */
  getCredentials(
    projectId,
    credentialsId,
    endpoint = "v1/projects/:projectId/onprem/distribution/credentials/:credentialsId"
  ) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint
          .replace(/:projectId/, projectId)
          .replace(/:credentialsId/, credentialsId);
        const result = yield this.get(this.fetch, url);
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * @see https://developers.deepgram.com/reference/create-credentials
   */
  createCredentials(
    projectId,
    options,
    endpoint = "v1/projects/:projectId/onprem/distribution/credentials"
  ) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId);
        const body = JSON.stringify(options);
        const result = yield this.post(this.fetch, url, body);
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * @see https://developers.deepgram.com/reference/delete-credentials
   */
  deleteCredentials(
    projectId,
    credentialsId,
    endpoint = "v1/projects/:projectId/onprem/distribution/credentials/:credentialsId"
  ) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint
          .replace(/:projectId/, projectId)
          .replace(/:credentialsId/, credentialsId);
        const result = yield this.delete(this.fetch, url);
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
}
//# sourceMappingURL=OnPremClient.js.map

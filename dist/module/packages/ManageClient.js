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
import { appendSearchParams } from "../lib/helpers";
export class ManageClient extends AbstractRestfulClient {
  /**
   * @see https://developers.deepgram.com/reference/get-projects
   */
  getProjects(endpoint = "v1/projects") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint;
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
   * @see https://developers.deepgram.com/reference/get-project
   */
  getProject(projectId, endpoint = "v1/projects/:projectId") {
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
   * @see https://developers.deepgram.com/reference/update-project
   */
  updateProject(projectId, options, endpoint = "v1/projects/:projectId") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId);
        const body = JSON.stringify(options);
        const result = yield this.patch(this.fetch, url, body);
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
   * @see https://developers.deepgram.com/reference/delete-project
   */
  deleteProject(projectId, endpoint = "v1/projects/:projectId") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId);
        yield this.delete(this.fetch, url);
        return { error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { error };
        }
        throw error;
      }
    });
  }
  /**
   * @see https://developers.deepgram.com/reference/list-keys
   */
  getProjectKeys(projectId, endpoint = "v1/projects/:projectId/keys") {
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
   * @see https://developers.deepgram.com/reference/get-key
   */
  getProjectKey(projectId, keyId, endpoint = "v1/projects/:projectId/keys/:keyId") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId).replace(/:keyId/, keyId);
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
   * @see https://developers.deepgram.com/reference/create-key
   */
  createProjectKey(projectId, options, endpoint = "v1/projects/:projectId/keys") {
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
   * @see https://developers.deepgram.com/reference/delete-key
   */
  deleteProjectKey(projectId, keyId, endpoint = "v1/projects/:projectId/keys/:keyId") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId).replace(/:keyId/, keyId);
        yield this.delete(this.fetch, url);
        return { error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { error };
        }
        throw error;
      }
    });
  }
  /**
   * @see https://developers.deepgram.com/reference/get-members
   */
  getProjectMembers(projectId, endpoint = "v1/projects/:projectId/members") {
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
   * @see https://developers.deepgram.com/reference/remove-member
   */
  removeProjectMember(projectId, memberId, endpoint = "v1/projects/:projectId/members/:memberId") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId).replace(/:memberId/, memberId);
        yield this.delete(this.fetch, url);
        return { error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { error };
        }
        throw error;
      }
    });
  }
  /**
   * @see https://developers.deepgram.com/reference/get-member-scopes
   */
  getProjectMemberScopes(
    projectId,
    memberId,
    endpoint = "v1/projects/:projectId/members/:memberId/scopes"
  ) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId).replace(/:memberId/, memberId);
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
   * @see https://developers.deepgram.com/reference/update-scope
   */
  updateProjectMemberScope(
    projectId,
    memberId,
    options,
    endpoint = "v1/projects/:projectId/members/:memberId/scopes"
  ) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId).replace(/:memberId/, memberId);
        const body = JSON.stringify(options);
        const result = yield this.put(this.fetch, url, body);
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
   * @see https://developers.deepgram.com/reference/list-invites
   */
  getProjectInvites(projectId, endpoint = "v1/projects/:projectId/invites") {
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
   * @see https://developers.deepgram.com/reference/send-invites
   */
  sendProjectInvite(projectId, options, endpoint = "v1/projects/:projectId/invites") {
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
   * @see https://developers.deepgram.com/reference/delete-invite
   */
  deleteProjectInvite(projectId, email, endpoint = "v1/projects/:projectId/invites/:email") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId).replace(/:email/, email);
        yield this.delete(this.fetch, url);
        return { error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { error };
        }
        throw error;
      }
    });
  }
  /**
   * @see https://developers.deepgram.com/reference/leave-project
   */
  leaveProject(projectId, endpoint = "v1/projects/:projectId/leave") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId);
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
  /**
   * @see https://developers.deepgram.com/reference/get-all-requests
   */
  getProjectUsageRequests(projectId, options, endpoint = "v1/projects/:projectId/requests") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId);
        appendSearchParams(url.searchParams, options);
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
   * @see https://developers.deepgram.com/reference/get-request
   */
  getProjectUsageRequest(
    projectId,
    requestId,
    endpoint = "v1/projects/:projectId/requests/:requestId"
  ) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId).replace(/:requestId/, requestId);
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
   * @see https://developers.deepgram.com/reference/summarize-usage
   */
  getProjectUsageSummary(projectId, options, endpoint = "v1/projects/:projectId/usage") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId);
        appendSearchParams(url.searchParams, options);
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
   * @see https://developers.deepgram.com/reference/get-fields
   */
  getProjectUsageFields(projectId, options, endpoint = "v1/projects/:projectId/usage/fields") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId);
        appendSearchParams(url.searchParams, options);
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
   * @see https://developers.deepgram.com/reference/get-all-balances
   */
  getProjectBalances(projectId, endpoint = "v1/projects/:projectId/balances") {
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
   * @see https://developers.deepgram.com/reference/get-balance
   */
  getProjectBalance(projectId, balanceId, endpoint = "v1/projects/:projectId/balances/:balanceId") {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const url = new URL(this.baseUrl);
        url.pathname = endpoint.replace(/:projectId/, projectId).replace(/:balanceId/, balanceId);
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
}
//# sourceMappingURL=ManageClient.js.map

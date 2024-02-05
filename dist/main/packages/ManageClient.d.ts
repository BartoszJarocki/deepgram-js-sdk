import { AbstractRestfulClient } from "./AbstractRestfulClient";
import type {
  CreateProjectKeySchema,
  CreateProjectKeyResponse,
  DeepgramResponse,
  GetProjectBalanceResponse,
  GetProjectBalancesResponse,
  GetProjectInvitesResponse,
  GetProjectKeyResponse,
  GetProjectKeysResponse,
  GetProjectMemberScopesResponse,
  GetProjectMembersResponse,
  GetProjectResponse,
  GetProjectsResponse,
  GetProjectUsageFieldsSchema,
  GetProjectUsageFieldsResponse,
  GetProjectUsageRequestResponse,
  GetProjectUsageRequestsSchema,
  GetProjectUsageRequestsResponse,
  GetProjectUsageSummarySchema,
  GetProjectUsageSummaryResponse,
  MessageResponse,
  SendProjectInviteSchema,
  UpdateProjectMemberScopeSchema,
  UpdateProjectSchema,
  VoidResponse,
} from "../lib/types";
export declare class ManageClient extends AbstractRestfulClient {
  /**
   * @see https://developers.deepgram.com/reference/get-projects
   */
  getProjects(endpoint?: string): Promise<DeepgramResponse<GetProjectsResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/get-project
   */
  getProject(projectId: string, endpoint?: string): Promise<DeepgramResponse<GetProjectResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/update-project
   */
  updateProject(
    projectId: string,
    options: UpdateProjectSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<MessageResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/delete-project
   */
  deleteProject(projectId: string, endpoint?: string): Promise<VoidResponse>;
  /**
   * @see https://developers.deepgram.com/reference/list-keys
   */
  getProjectKeys(
    projectId: string,
    endpoint?: string
  ): Promise<DeepgramResponse<GetProjectKeysResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/get-key
   */
  getProjectKey(
    projectId: string,
    keyId: string,
    endpoint?: string
  ): Promise<DeepgramResponse<GetProjectKeyResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/create-key
   */
  createProjectKey(
    projectId: string,
    options: CreateProjectKeySchema,
    endpoint?: string
  ): Promise<DeepgramResponse<CreateProjectKeyResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/delete-key
   */
  deleteProjectKey(projectId: string, keyId: string, endpoint?: string): Promise<VoidResponse>;
  /**
   * @see https://developers.deepgram.com/reference/get-members
   */
  getProjectMembers(
    projectId: string,
    endpoint?: string
  ): Promise<DeepgramResponse<GetProjectMembersResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/remove-member
   */
  removeProjectMember(
    projectId: string,
    memberId: string,
    endpoint?: string
  ): Promise<VoidResponse>;
  /**
   * @see https://developers.deepgram.com/reference/get-member-scopes
   */
  getProjectMemberScopes(
    projectId: string,
    memberId: string,
    endpoint?: string
  ): Promise<DeepgramResponse<GetProjectMemberScopesResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/update-scope
   */
  updateProjectMemberScope(
    projectId: string,
    memberId: string,
    options: UpdateProjectMemberScopeSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<MessageResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/list-invites
   */
  getProjectInvites(
    projectId: string,
    endpoint?: string
  ): Promise<DeepgramResponse<GetProjectInvitesResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/send-invites
   */
  sendProjectInvite(
    projectId: string,
    options: SendProjectInviteSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<MessageResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/delete-invite
   */
  deleteProjectInvite(projectId: string, email: string, endpoint?: string): Promise<VoidResponse>;
  /**
   * @see https://developers.deepgram.com/reference/leave-project
   */
  leaveProject(projectId: string, endpoint?: string): Promise<DeepgramResponse<MessageResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/get-all-requests
   */
  getProjectUsageRequests(
    projectId: string,
    options: GetProjectUsageRequestsSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<GetProjectUsageRequestsResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/get-request
   */
  getProjectUsageRequest(
    projectId: string,
    requestId: string,
    endpoint?: string
  ): Promise<DeepgramResponse<GetProjectUsageRequestResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/summarize-usage
   */
  getProjectUsageSummary(
    projectId: string,
    options: GetProjectUsageSummarySchema,
    endpoint?: string
  ): Promise<DeepgramResponse<GetProjectUsageSummaryResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/get-fields
   */
  getProjectUsageFields(
    projectId: string,
    options: GetProjectUsageFieldsSchema,
    endpoint?: string
  ): Promise<DeepgramResponse<GetProjectUsageFieldsResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/get-all-balances
   */
  getProjectBalances(
    projectId: string,
    endpoint?: string
  ): Promise<DeepgramResponse<GetProjectBalancesResponse>>;
  /**
   * @see https://developers.deepgram.com/reference/get-balance
   */
  getProjectBalance(
    projectId: string,
    balanceId: string,
    endpoint?: string
  ): Promise<DeepgramResponse<GetProjectBalanceResponse>>;
}
//# sourceMappingURL=ManageClient.d.ts.map

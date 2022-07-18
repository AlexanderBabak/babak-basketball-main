import { get, post, remove, put } from "../baseFetch";
import { TeamsResponse, Team, TeamParams } from "./TeamsDto";
import { IdParams, ParamsGetElement } from "../appDto";

export enum InitialTeamsPageParams {
  page = 1,
  pageSize = 6,
}

const getTeams = async ({
  name,
  page = InitialTeamsPageParams.page,
  pageSize = InitialTeamsPageParams.pageSize,
}: ParamsGetElement): Promise<TeamsResponse> => {
  let url = `api/Team/GetTeams?Page=${page}&PageSize=${pageSize}`;
  if (name) {
    url = `${url}&Name=${name}`;
  }
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return get(url, "", user.token);
};

const getTeamId = async ({ id }: IdParams): Promise<Team> => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return get(`api/Team/Get?id=${id}`, "", user.token);
};

const deleteTeam = async ({ id }: IdParams): Promise<Team> => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return remove(`api/Team/Delete?id=${id}`, user.token);
};

const postTeam = async (params: TeamParams) => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return post("api/Team/Add", JSON.stringify(params), user.token);
};

const editTeam = async (params: TeamParams) => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return put("api/Team/Update", JSON.stringify(params), user.token);
};

export const teamsServices = {
  getTeamId,
  deleteTeam,
  editTeam,
  postTeam,
  getTeams,
};

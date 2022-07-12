import { get, post, remove, put } from "../baseFetch";
import { TeamsResponse, Team, TeamParams } from "./TeamsDto";
import { IdParams, ParamsGetElement } from "../appDto";
import { CustomError } from "../../common/helpers/errorHelper";
import { User } from "../auth/AuthDto";

export enum InitialTeamsPageParams {
  page = 1,
  pageSize = 6,
}

const getTeams = async (
  user: User,
  {
    name,
    page = InitialTeamsPageParams.page,
    pageSize = InitialTeamsPageParams.pageSize,
  }: ParamsGetElement
): Promise<TeamsResponse> => {
  let url = `api/Team/GetTeams?Page=${page}&PageSize=${pageSize}`;
  if (name) {
    url = `${url}&Name=${name}`;
  }

  const response = await get(url, "", user.token);
  return response.json();
};

const getTeamId = async (user: User, { id }: IdParams): Promise<Team> => {
  const response = await get(`api/Team/Get?id=${id}`, "", user.token);
  return response.json();
};

const deleteTeam = async (user: User, { id }: IdParams): Promise<Team> => {
  const response = await remove(`api/Team/Delete?id=${id}`, user.token);
  if (!response.ok) {
    switch (response.status) {
      case 500:
        throw new CustomError(
          response.status.toString(),
          "Невозможно удалить команду, необходимо удалить игроков!"
        );
      default:
        throw new CustomError(
          response.status.toString(),
          "Ошибка удаления команды!"
        );
    }
  }

  return response.json();
};

const postTeam = async (user: User, params: TeamParams) => {
  const response = await post(
    "api/Team/Add",
    JSON.stringify(params),
    user.token
  );

  if (!response.ok) {
    switch (response.status) {
      case 409:
        throw new CustomError(
          response.status.toString(),
          "Эта команда уже добавлена!"
        );
      default:
        throw new CustomError(
          response.status.toString(),
          "Ошибка добавления команды!"
        );
    }
  }

  return response.json();
};

const editTeam = async (user: User, params: TeamParams) => {
  const response = await put(
    "api/Team/Update",
    JSON.stringify(params),
    user.token
  );
  return response.json();
};

export const teamsServices = {
  getTeamId,
  deleteTeam,
  editTeam,
  postTeam,
  getTeams,
};

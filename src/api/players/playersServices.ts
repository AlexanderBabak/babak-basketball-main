import { post, get, put, remove } from "../baseFetch";
import { PlayersResponse, PlayerParams, Player } from "./PlayersDto";
import { IdParams, ParamsGetElement } from "../appDto";

const postPlayer = async (params: PlayerParams) => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return post("api/Player/Add", JSON.stringify(params), user.token);
};

const getPositions = async () => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return get("api/Player/GetPositions", "", user.token);
};

export enum InitialPlayersPageParams {
  page = 1,
  pageSize = 6,
}

const getPlayers = async ({
  name,
  page = InitialPlayersPageParams.page,
  pageSize = InitialPlayersPageParams.pageSize,
}: ParamsGetElement): Promise<PlayersResponse> => {
  let url = `api/Player/GetPlayers?Page=${page}&PageSize=${pageSize}`;
  if (name) {
    url = `${url}&Name=${name}`;
  }
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return get(url, "", user.token);
};

const deletePlayer = async ({ id }: IdParams): Promise<Player> => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return remove(`api/Player/Delete?id=${id}`, user.token);
};

const getPlayerId = async ({ id }: IdParams): Promise<Player> => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return get(`api/Player/Get?id=${id}`, "", user.token);
};

const getPlayerTeamIds = async (
  TeamIds: Array<{ value: string }>
): Promise<PlayersResponse> => {
  const newParams = TeamIds.map((item) => ["TeamIds", item.value]);
  const newTeamIds = new URLSearchParams(newParams).toString();
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return get(`api/Player/GetPlayers?${newTeamIds}`, "", user.token);
};

const editPlayer = async (params: PlayerParams) => {
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return put("api/Player/Update", JSON.stringify(params), user.token);
};

export const playerServices = {
  getPlayers,
  getPositions,
  getPlayerId,
  postPlayer,
  deletePlayer,
  getPlayerTeamIds,
  editPlayer,
};

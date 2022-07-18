import { createAsyncThunk } from "@reduxjs/toolkit";
import { playerServices } from "../../api/players/playersServices";
import { getUploadedImage } from "../../api/postImg";
import {
  Player,
  PlayerParams,
  PlayersResponse,
} from "../../api/players/PlayersDto";
import { ParamsGetElement } from "../../api/appDto";
import { teamsServices } from "../../api/teams/teamsServices";
import { Team } from "../../api/teams/TeamsDto";

export const fetchPlayers = createAsyncThunk<PlayersResponse, ParamsGetElement>(
  "players/fetchPlayersFilter",
  async (params) => {
    return await playerServices.getPlayers(params);
  }
);

export const fetchPositions = createAsyncThunk(
  "players/fetchPositions",
  async () => {
    return await playerServices.getPositions();
  }
);

export const fetchAddPlayer = createAsyncThunk<Player, PlayerParams>(
  "players/fetchAddPlayer",

  async (params) => {
    const { imageFile, callback, ...restParams } = params;
    const avatarUrl = imageFile ? await getUploadedImage(imageFile) : "";
    const response = await playerServices.postPlayer({
      avatarUrl,
      ...restParams,
    });
    if (response) {
      callback && callback();
      return response;
    }
  }
);

export const fetchPlayerId = createAsyncThunk<Player, { id: string }>(
  "players/fetchPlayerId",
  async (params) => {
    return await playerServices.getPlayerId(params);
  }
);

export const fetchDeletePlayer = createAsyncThunk<Player, { id: string }>(
  "players/fetchDeletePlayer",
  async (params) => {
    return await playerServices.deletePlayer(params);
  }
);

export const fetchPlayersTeamIds = createAsyncThunk<
  PlayersResponse,
  Array<{ value: string }>
>("players/fetchPlayersTeamIds", async (TeamIds) => {
  return await playerServices.getPlayerTeamIds(TeamIds);
});

export const fetchEditPlayer = createAsyncThunk<Player, PlayerParams>(
  "players/fetchEditPlayer",
  async (params) => {
    const { imageUrl, imageFile, callback, ...restParams } = params;

    const avatarUrl = imageFile ? await getUploadedImage(imageFile) : imageUrl;

    const response = await playerServices.editPlayer({
      avatarUrl,
      ...restParams,
    });
    if (response) {
      callback && callback();
      return response;
    }
  }
);

export const fetchTeamsFilter = createAsyncThunk<Team[], ParamsGetElement>(
  "players/fetchTeamsFilter",
  async (params) => {
    const response = await teamsServices.getTeams(params);
    return response.data;
  }
);

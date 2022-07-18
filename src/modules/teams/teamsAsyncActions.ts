import { createAsyncThunk } from "@reduxjs/toolkit";
import { teamsServices } from "../../api/teams/teamsServices";
import { TeamsResponse, Team, TeamParams } from "../../api/teams/TeamsDto";
import { ParamsGetElement } from "../../api/appDto";
import { getUploadedImage } from "../../api/postImg";
import { PlayersResponse } from "../../api/players/PlayersDto";
import { playerServices } from "../../api/players/playersServices";

export const fetchTeams = createAsyncThunk<
  TeamsResponse,
  ParamsGetElement,
  { rejectValue: string; getState: () => void }
>("teams/fetchTeams", async (params) => {
  return await teamsServices.getTeams(params);
});

export const fetchTeamId = createAsyncThunk<
  Team,
  { id: string },
  { rejectValue: string; getState: () => void }
>("teams/fetchTeamId", async (params) => {
  return await teamsServices.getTeamId(params);
});

export const fetchDeleteTeam = createAsyncThunk<
  Team,
  { id: string },
  { rejectValue: string; getState: () => void }
>("teams/fetchDeleteTeam", async (params) => {
  return await teamsServices.deleteTeam(params);
});

export const fetchAddTeam = createAsyncThunk<Team, TeamParams>(
  "teams/fetchAddTeam",

  async (params) => {
    const { imageFile, callback, ...restParams } = params;

    const imageUrl = imageFile ? await getUploadedImage(imageFile) : "";

    const response = await teamsServices.postTeam({
      imageUrl,
      ...restParams,
    });
    if (response) {
      callback && callback();
      return response;
    }
  }
);

export const fetchEditTeam = createAsyncThunk<
  Team,
  TeamParams,
  { rejectValue: string; getState: () => void }
>(
  "teams/fetchEditTeam",

  async (params) => {
    const { imageFile, imageUrlLogo, callback, ...restParams } = params;

    const imageUrl = imageFile
      ? await getUploadedImage(imageFile)
      : imageUrlLogo;
    const response = await teamsServices.editTeam({
      imageUrl,
      ...restParams,
    });
    if (response) {
      callback && callback();
      return response;
    }
  }
);

export const fetchTeamPlayers = createAsyncThunk<
  PlayersResponse,
  Array<{ value: string }>
>("teams/fetchTeamPlayers", async (TeamIds) => {
  return await playerServices.getPlayerTeamIds(TeamIds);
});

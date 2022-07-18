import { createSlice } from "@reduxjs/toolkit";
import { TeamParams } from "../../api/teams/TeamsDto";
import {
  fetchAddTeam,
  fetchDeleteTeam,
  fetchEditTeam,
  fetchTeamId,
  fetchTeamPlayers,
  fetchTeams,
} from "./teamsAsyncActions";
import { RootState } from "../../core/redux/store";
import { LoadState } from "../../core/redux/loadState";
import { PlayerParams } from "../../api/players/PlayersDto";

interface TeamsState {
  dataTeams: Array<TeamParams>;
  teamsFilter?: Array<TeamParams>;
  loading: LoadState;
  loadingTeamPlayers: LoadState;
  teamPlayers: Array<PlayerParams>;
  count?: number;
  size?: number;
  team?: TeamParams;
  errorTeams: string | undefined;
}

const initialState: TeamsState = {
  dataTeams: [],
  teamPlayers: [],
  loading: LoadState.needLoad,
  loadingTeamPlayers: LoadState.needLoad,
  errorTeams: "",
};

const teamsSlice = createSlice({
  name: "teams",
  initialState: initialState,
  reducers: {
    clearData(state): void {
      state.dataTeams = [];
      state.teamPlayers = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state) => {
      state.loading = LoadState.pending;
      state.dataTeams = [];
      state.errorTeams = "";
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.loading = LoadState.idle;
      state.dataTeams = action.payload.data;
      state.count = action.payload.count;
      state.size = action.payload.size;
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorTeams = action.error.message;
    });
    builder.addCase(fetchTeamId.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorTeams = "";
    });
    builder.addCase(fetchTeamId.fulfilled, (state, action) => {
      state.loading = LoadState.idle;
      state.team = action.payload;
    });
    builder.addCase(fetchTeamId.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorTeams = action.error.message;
    });
    builder.addCase(fetchTeamPlayers.pending, (state) => {
      state.loadingTeamPlayers = LoadState.pending;
      state.errorTeams = "";
    });
    builder.addCase(fetchTeamPlayers.fulfilled, (state, action) => {
      state.loadingTeamPlayers = LoadState.idle;
      state.teamPlayers = action.payload.data;
    });
    builder.addCase(fetchTeamPlayers.rejected, (state, action) => {
      state.loadingTeamPlayers = LoadState.idle;
      state.errorTeams = action.error.message;
    });

    builder.addCase(fetchDeleteTeam.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorTeams = "";
    });
    builder.addCase(fetchDeleteTeam.fulfilled, (state) => {
      state.loading = LoadState.idle;
    });
    builder.addCase(fetchDeleteTeam.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorTeams = action.error.message;
    });
    builder.addCase(fetchAddTeam.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorTeams = "";
    });
    builder.addCase(fetchAddTeam.fulfilled, (state) => {
      state.loading = LoadState.idle;
    });
    builder.addCase(fetchAddTeam.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorTeams = action.error.message;
    });
    builder.addCase(fetchEditTeam.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorTeams = "";
    });
    builder.addCase(fetchEditTeam.fulfilled, (state) => {
      state.loading = LoadState.idle;
    });
    builder.addCase(fetchEditTeam.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorTeams = action.error.message;
    });
  },
});

export const teamsSelector = (state: RootState) => state.teams;
export const { clearData } = teamsSlice.actions;
export const teamsReducer = teamsSlice.reducer;

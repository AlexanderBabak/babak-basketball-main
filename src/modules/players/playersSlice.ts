import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddPlayer,
  fetchDeletePlayer,
  fetchEditPlayer,
  fetchPlayerId,
  fetchPlayers,
  fetchPlayersTeamIds,
  fetchPositions,
  fetchTeamsFilter,
} from "./playersAsyncActions";
import { RootState } from "../../core/redux/store";
import { Player, PlayerParams } from "../../api/players/PlayersDto";
import { LoadState } from "../../core/redux/loadState";
import { TeamParams } from "../../api/teams/TeamsDto";

interface PlayersState {
  loading: LoadState;
  data: Array<PlayerParams>;
  teamsFilter: Array<TeamParams>;
  loadingTeamsFilter: LoadState;
  positions?: Array<string>;
  player?: Player;
  count?: number;
  size?: number;
  errorPlayers: string | undefined;
}

const initialState: PlayersState = {
  data: [],
  teamsFilter: [],
  loading: LoadState.needLoad,
  loadingTeamsFilter: LoadState.needLoad,
  errorPlayers: "",
};

const playersSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    clearData(state): void {
      state.data = [];
      state.teamsFilter = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlayers.pending, (state) => {
      state.loading = LoadState.pending;
      state.data = [];
      state.errorPlayers = "";
    });
    builder.addCase(fetchPlayers.fulfilled, (state, action) => {
      state.loading = LoadState.idle;
      state.data = action.payload.data;
      state.count = action.payload.count;
      state.size = action.payload.size;
    });
    builder.addCase(fetchPlayers.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorPlayers = action.error.message;
    });

    builder.addCase(fetchPlayerId.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorPlayers = "";
    });
    builder.addCase(fetchPlayerId.fulfilled, (state, action) => {
      state.loading = LoadState.idle;
      state.player = action.payload;
    });
    builder.addCase(fetchPlayerId.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorPlayers = action.error.message;
    });
    builder.addCase(fetchPositions.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorPlayers = "";
    });
    builder.addCase(fetchPositions.fulfilled, (state, action) => {
      state.loading = LoadState.idle;
      state.positions = action.payload;
    });
    builder.addCase(fetchPositions.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorPlayers = action.error.message;
    });
    builder.addCase(fetchAddPlayer.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorPlayers = "";
    });
    builder.addCase(fetchAddPlayer.fulfilled, (state) => {
      state.loading = LoadState.idle;
    });
    builder.addCase(fetchAddPlayer.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorPlayers = action.error.message;
    });
    builder.addCase(fetchEditPlayer.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorPlayers = "";
    });
    builder.addCase(fetchEditPlayer.fulfilled, (state) => {
      state.loading = LoadState.idle;
    });
    builder.addCase(fetchEditPlayer.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorPlayers = action.error.message;
    });
    builder.addCase(fetchDeletePlayer.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorPlayers = "";
    });
    builder.addCase(fetchDeletePlayer.fulfilled, (state) => {
      state.loading = LoadState.idle;
    });
    builder.addCase(fetchDeletePlayer.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorPlayers = action.error.message;
    });
    builder.addCase(fetchPlayersTeamIds.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorPlayers = "";
    });
    builder.addCase(fetchPlayersTeamIds.fulfilled, (state, action) => {
      state.loading = LoadState.idle;
      state.data = action.payload.data;
      state.count = action.payload.count;
      state.size = action.payload.size;
    });
    builder.addCase(fetchPlayersTeamIds.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorPlayers = action.error.message;
    });
    builder.addCase(fetchTeamsFilter.pending, (state) => {
      state.loadingTeamsFilter = LoadState.pending;
      state.teamsFilter = [];
    });
    builder.addCase(fetchTeamsFilter.fulfilled, (state, action) => {
      state.loadingTeamsFilter = LoadState.idle;
      state.teamsFilter = action.payload;
    });
    builder.addCase(fetchTeamsFilter.rejected, (state, action) => {
      state.loadingTeamsFilter = LoadState.idle;
      state.errorPlayers = action.error.message;
    });
  },
});

export const playersSelector = (state: RootState) => state.players;
export const { clearData } = playersSlice.actions;

export const playersReducer = playersSlice.reducer;

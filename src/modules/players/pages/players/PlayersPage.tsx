import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import styled from "styled-components";
import { CardWrapper } from "../../../../assets/styles/CardWrapper";
import { ContentLayout } from "../../../../common/components/layouts/ContentLayout";
import { PlayerCard } from "./components/PlayerCard";
import { clearData, playersSelector } from "../../playersSlice";
import { useAppDispatch } from "../../../../core/redux/store";
import {
  fetchPlayers,
  fetchPlayersTeamIds,
  fetchTeamsFilter,
} from "../../playersAsyncActions";
import { pathList } from "../../../../routers/pathList";
import { Spinner } from "../../../../common/components/Spiner";
import { OptionTypeBase } from "react-select";
import { LoadState } from "../../../../core/redux/loadState";
import { InitialPlayersPageParams } from "../../../../api/players/services";
import { EmptyContent } from "../../../../common/components/EmptyContent";
import emptyPlayerImg from "../../../../assets/images/empty-player-bg.png";
import { useDebounceValue } from "../../../../common/hooks/useDebounceValue";
import { InitialTeamsPageParams } from "../../../../api/teams/services";
import { TeamParams } from "../../../../api/teams/TeamsDto";

const DEFAULT_FIELD_VALUES = {
  name: "",
  pageSize: {
    value: InitialTeamsPageParams.pageSize,
    label: InitialTeamsPageParams.pageSize,
  },
};

interface FormFields {
  pageSize: OptionTypeBase;
  name: string;
  nameSelects: { value: string }[];
}

export const PlayersPage = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(InitialPlayersPageParams.page);
  const { loading, data, count, size, teamsFilter } =
    useSelector(playersSelector);
  const { register, control, reset, watch } = useForm<FormFields>({
    defaultValues: DEFAULT_FIELD_VALUES,
  });
  const { pageSize, name, nameSelects } = watch([
    "pageSize",
    "name",
    "nameSelects",
  ]);
  const [countAll, setCount] = useState(0);
  const debounceName = useDebounceValue<string>(name);

  useEffect(() => {
    const value = localStorage.getItem("search");
    if (value === name) return;
    value && reset({ name: value });
    localStorage.removeItem("search");

    window.addEventListener("unload", function () {
      localStorage.setItem("search", name);
    });
    return () => window.removeEventListener("unload", () => {});
  }, [reset, name]);

  useEffect(() => {
    dispatch(fetchPlayers({ page, pageSize: pageSize?.value })).then((res) => {
      const payload = res.payload as { count: number };
      setCount(payload.count);
    });
    dispatch(fetchTeamsFilter({}));
    return () => {
      dispatch(clearData());
    };
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    nameSelects && dispatch(fetchPlayersTeamIds(nameSelects));
  }, [dispatch, nameSelects]);

  useEffect(() => {
    countAll > 0 &&
      dispatch(
        fetchPlayers({ name: debounceName, page, pageSize: pageSize?.value })
      );
  }, [dispatch, debounceName, pageSize, page, countAll]);

  const onPageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  const pageCount = useMemo(() => {
    if (count && size) {
      return Math.ceil(count / size);
    }
    return InitialPlayersPageParams.page;
  }, [count, size]);

  const teamsOptions = useMemo(() => {
    return teamsFilter.map((team: TeamParams) => ({
      value: team.id,
      label: team.name,
    }));
  }, [teamsFilter]);

  const handleInputChange = useCallback(
    (newValue: string) => {
      newValue &&
        dispatch(
          fetchTeamsFilter({
            name: newValue,
            page: page,
            pageSize: pageSize?.value,
          })
        );
    },
    [dispatch, page, pageSize]
  );

  const loadSuggestions = debounce(handleInputChange, 750);

  return (
    <ContentLayout
      onPageChange={onPageChange}
      register={register}
      selectOptions={teamsOptions}
      handleInputChange={loadSuggestions}
      placeholder="Search..."
      nameSearch="name"
      nameSearchSelect="nameSelects"
      control={control}
      addItemPath={pathList.content.addPlayer}
      pageCount={pageCount}
      count={countAll}
    >
      {loading === LoadState.pending ? (
        <Spinner />
      ) : data.length ? (
        <CardWrapper>
          {data &&
            data.map(({ name, id, number, team, avatarUrl }: any) => {
              return (
                <PlayerLink to={pathList.content.players + id} key={id}>
                  <PlayerCard
                    name={name}
                    number={number}
                    team={team}
                    avatarUrl={avatarUrl}
                  />
                </PlayerLink>
              );
            })}
        </CardWrapper>
      ) : (
        <EmptyContent label={"player"} emptyImg={emptyPlayerImg} />
      )}
    </ContentLayout>
  );
};

const PlayerLink = styled(Link)`
  text-decoration: none;
`;

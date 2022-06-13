import { useEffect, useMemo, useState } from "react";
import { ContentLayout } from "../../../../common/components/layouts/ContentLayout";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TeamCard } from "./components/TeamCard";
import { useSelector } from "react-redux";
import { teamsSelector } from "../../teamsSlice";
import styled from "styled-components";
import { fetchTeams } from "../../teamsAsyncActions";
import { useAppDispatch } from "../../../../core/redux/store";
import { pathList } from "../../../../routers/pathList";
import { Spinner } from "../../../../common/components/Spiner";
import { CardWrapper } from "../../../../assets/styles/CardWrapper";
import { OptionTypeBase } from "react-select";
import { InitialTeamsPageParams } from "../../../../api/teams/services";
import { EmptyContent } from "../../../../common/components/EmptyContent";
import { LoadState } from "../../../../core/redux/loadState";
import emptyTeamImg from "../../../../assets/images/empty-teams-bg.png";
import { useDebounceValue } from "../../../../common/hooks/useDebounceValue";

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
  nameSelects: OptionTypeBase[];
}

export const TeamsPage = () => {
  const dispatch = useAppDispatch();
  const { dataTeams, loading, count, size } = useSelector(teamsSelector);
  const [page, setPage] = useState<number>(InitialTeamsPageParams.page);
  const { register, control, watch } = useForm<FormFields>({
    defaultValues: DEFAULT_FIELD_VALUES,
  });
  const pageSize = watch("pageSize");
  const name = watch("name");
  const debounceName = useDebounceValue<string>(name);

  useEffect(() => {
    dispatch(
      fetchTeams({ name: debounceName, pageSize: pageSize?.value, page })
    );
  }, [dispatch, debounceName, pageSize, page]);

  const onPageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  const pageCount = useMemo(() => {
    if (count && size) {
      return Math.ceil(count / size);
    }
    return InitialTeamsPageParams.page;
  }, [count, size]);

  return (
    <ContentLayout
      onPageChange={onPageChange}
      register={register}
      placeholder="Search..."
      nameSearch="name"
      control={control}
      addItemPath={pathList.content.addTeam}
      pageCount={pageCount}
    >
      {loading === LoadState.pending ? (
        <Spinner />
      ) : dataTeams.length ? (
        <CardWrapper>
          {dataTeams &&
            dataTeams.map(({ name, foundationYear, id, imageUrl }: any) => {
              return (
                <TeamLink to={pathList.content.teams + id} key={id}>
                  <TeamCard
                    name={name}
                    foundationYear={foundationYear}
                    imageUrl={imageUrl}
                  />
                </TeamLink>
              );
            })}
        </CardWrapper>
      ) : (
        <EmptyContent label={"team"} emptyImg={emptyTeamImg} />
      )}
    </ContentLayout>
  );
};

const TeamLink = styled(Link)`
  text-decoration: none;
`;

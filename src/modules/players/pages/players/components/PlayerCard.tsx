import styled from "styled-components";
import { PlayerParams } from "../../../../../api/players/PlayersDto";
import noLogo from "../../../../../assets/images/no-logo.png";

type Props = Pick<PlayerParams, "name" | "number" | "team" | "avatarUrl">;

export const PlayerCard = ({ name, number, team, avatarUrl }: Props) => (
  <>
    <ImgContainer>
      <Img
        src={avatarUrl ? `http://dev.trainee.dex-it.ru${avatarUrl}` : noLogo}
        alt="photo"
      />
    </ImgContainer>
    <Description>
      <PlayerName>
        {name}
        <PlayerNumber>&nbsp;#{number}</PlayerNumber>
      </PlayerName>
      <PlayerTeam>{team}</PlayerTeam>
    </Description>
  </>
);

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 11px 24px 0 24px;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  max-width: 365px;
  width: 100%;
  height: 280px;
  background: linear-gradient(
    121.57deg,
    ${({ theme }) => theme.colors.grey} 1.62%,
    #393939 81.02%
  );
  @media ${({ theme }) => theme.deviceSize.tablet} {
    padding: 73px 0 0 0;
  }
`;

const Img = styled.img`
  max-width: 100%;
  object-fit: contain;
`;

const Description = styled.div`
  text-align: center;
  padding: 19px 5px;
  border-radius: 0 0 4px 4px;
  max-width: 365px;
  width: 100%;
  background: ${({ theme }) => theme.colors.darkGrey};
  color: ${({ theme }) => theme.colors.white};
`;

const PlayerName = styled.h1`
  font-size: 12px;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media ${({ theme }) => theme.deviceSize.tablet} {
    font-size: 18px;
  }
`;

const PlayerNumber = styled.span`
  color: ${({ theme }) => theme.colors.lightRed};
  font-size: 12px;
  margin-bottom: 10px;

  @media ${({ theme }) => theme.deviceSize.tablet} {
    font-size: 18px;
  }
`;

const PlayerTeam = styled.p`
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media ${({ theme }) => theme.deviceSize.tablet} {
    font-size: 14px;
  }
`;

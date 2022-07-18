import styled from "styled-components";
import noLogo from "../../../../../assets/images/no-logo.png";

interface Props {
  avatarUrl?: string;
  name?: string;
  position?: string;
  teamName?: string;
  height?: number;
  weight?: number;
  age?: number;
  number?: number;
}

export const PlayerProfile = ({
  avatarUrl,
  name,
  position,
  teamName,
  height,
  weight,
  age,
  number,
}: Props) => {
  const playerMeta = [
    {
      label: "Position",
      value: position?.replace(/([A-Z][a-z]+)/g, "$1 ").trim(),
    },
    { label: "Team", value: teamName },
    { label: "Height", value: height },
    { label: "Weight", value: weight },
    { label: "Age", value: age },
  ];

  return (
    <ProfileContainer>
      <ImgWrapper>
        <Img
          src={avatarUrl ? `http://dev.trainee.dex-it.ru${avatarUrl}` : noLogo}
          alt={"Logo"}
        />
      </ImgWrapper>
      <PlayerInfo>
        <PlayerName>
          {name}
          <PlayerNumber>&nbsp;#{number}</PlayerNumber>
        </PlayerName>
        <MetaWrapper>
          {playerMeta?.map(({ label, value }, index) => {
            return (
              <MetaItem key={index}>
                <ItemLabel>{label}</ItemLabel>
                <ItemValue>{value}</ItemValue>
              </MetaItem>
            );
          })}
        </MetaWrapper>
      </PlayerInfo>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  width: 100%;
  background: linear-gradient(
    276.45deg,
    ${({ theme }) => theme.colors.grey} 0%,
    #393939 100.28%
  );
  @media ${({ theme }) => theme.deviceSize.laptop} {
    display: flex;
    border-radius: 0 0 10px 10px;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 48px 118px;
  overflow: hidden;

  @media ${({ theme }) => theme.deviceSize.laptop} {
    max-width: 587px;
    width: 100%;
    padding: 0;
  }
`;

const Img = styled.img`
  max-width: 163px;
  max-height: 112px;
  width: 100%;
  object-fit: contain;

  @media ${({ theme }) => theme.deviceSize.laptop} {
    max-width: 500px;
    max-height: 400px;
  }
`;

const PlayerInfo = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding: 0 10px;
  @media ${({ theme }) => theme.deviceSize.laptop} {
    text-align: start;
    padding: 65px 0;
  }
`;
const PlayerName = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
  font-weight: 800;
  text-overflow: ellipsis;
  overflow: hidden;

  @media ${({ theme }) => theme.deviceSize.laptop} {
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

const PlayerNumber = styled.span`
  color: ${({ theme }) => theme.colors.lightRed};
  font-size: 24px;
  margin-bottom: 32px;
  font-weight: 800;

  @media ${({ theme }) => theme.deviceSize.laptop} {
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

const MetaWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;

  @media ${({ theme }) => theme.deviceSize.laptop} {
    grid-template-columns: 1fr 1fr;
  }
`;

const MetaItem = styled.div`
  margin-bottom: 48px;

  @media ${({ theme }) => theme.deviceSize.laptop} {
    margin-bottom: 54px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ItemLabel = styled.div`
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 8px;

  @media ${({ theme }) => theme.deviceSize.laptop} {
    font-size: 24px;
  }
`;

const ItemValue = styled.div`
  font-size: 14px;
  @media ${({ theme }) => theme.deviceSize.laptop} {
    font-size: 18px;
  }
`;

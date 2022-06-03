import { FC, useState } from "react";
import { AppHeader } from "../AppHeader";
import { Sidebar } from "../navigation/Sidebar";
import styled from "styled-components";

export const AppLayout: FC = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setToggleSidebar((prevState) => !prevState);
  };

  return (
    <Layout>
      <AppHeader
        toggleSidebar={toggleSidebar}
        onToggleSidebar={handleToggleSidebar}
      />
      <ContentWrapper>
        <Sidebar toggleSidebar={toggleSidebar} />
        <Content>{children}</Content>
      </ContentWrapper>
    </Layout>
  );
};

const Layout = styled.div`
  background: ${({ theme }) => theme.colors.lightestGrey1};
  height: 100vh;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Content = styled.div`
  padding: 16px 0;
  width: 100%;
  height: calc(100vh - 62px);
  overflow-y: auto;

  @media ${({ theme }) => theme.deviceSize.tablet} {
    padding: 32px 80px;
    height: calc(100vh - 80px);
  } ;
`;
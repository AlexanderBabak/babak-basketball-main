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
        <Sidebar
          toggleSidebar={toggleSidebar}
          onToggleSidebar={handleToggleSidebar}
        />
        {toggleSidebar && <BackDrop onClick={handleToggleSidebar} />}
        <ContentInner>
          <Content>{children}</Content>
        </ContentInner>
      </ContentWrapper>
    </Layout>
  );
};

const Layout = styled.div`
  background: ${({ theme }) => theme.colors.lightestGrey1};
  height: 100vh;
  position: relative;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const ContentInner = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
`;

const Content = styled.div`
  padding: 16px 0;
  height: calc(100vh - 62px);

  @media ${({ theme }) => theme.deviceSize.tablet} {
    margin-left: 140px;
    padding: 32px 80px;
    height: calc(100vh - 80px);
  } ;
`;

const BackDrop = styled.div`
  z-index: 150;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  @media ${({ theme }) => theme.deviceSize.tablet} {
    display: none;
  }
`;

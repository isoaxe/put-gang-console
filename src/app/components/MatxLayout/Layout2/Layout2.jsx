import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Layout2Navbar from "./Layout2Navbar";
import Layout2Topbar from "./Layout2Topbar";
import Scrollbar from "react-perfect-scrollbar";
import useSettings from "app/hooks/useSettings";
import { Layout2Container } from "./layout2.style";
import { Hidden, ThemeProvider } from "@mui/material";
import Layout1Sidenav from "../Layout1/Layout1Sidenav";
import SidenavTheme from "../../MatxTheme/SidenavTheme/SidenavTheme";
import SecondarySidebar from "../../SecondarySidebar/SecondarySidebar";
import { styled, useTheme, Box } from "@mui/system";

const Layout2Root = styled("div")(() => ({
  height: "100vh",
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
}));

const ContentBox = styled(Box)(() => ({
  padding: 0,
  height: "100%",
  display: "flex",
  overflowY: "auto",
  overflowX: "hidden",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  position: "relative",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
}));

const Layout2 = () => {
  const theme = useTheme();
  const { settings } = useSettings();

  let { layout2Settings } = settings;
  let topbarTheme = settings.themes[layout2Settings.topbar.theme];
  let navbarTheme = settings.themes[layout2Settings.navbar.theme];
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav },
  } = layout2Settings;

  let layoutClasses = {
    [settings.activeLayout]: true,
    "bg-default text-primary": true,
    [`sidenav-${layout2Settings.leftSidebar.mode}`]: true,
    [`layout-${layout2Settings.mode} theme-${theme.palette.type}`]: true,
  };

  return (
    <Layout2Container>
      <Layout2Root className={layoutClasses}>
        {layout2Settings.topbar.show && (
          <ThemeProvider theme={topbarTheme}>
            <Layout2Topbar />
          </ThemeProvider>
        )}

        <Hidden smDown>
          {layout2Settings.navbar.show && (
            <ThemeProvider theme={navbarTheme}>
              <Layout2Navbar />
            </ThemeProvider>
          )}
        </Hidden>

        {showSidenav && sidenavMode !== "close" && (
          <SidenavTheme>
            <Layout1Sidenav />
          </SidenavTheme>
        )}

        {settings.perfectScrollbar && (
          <StyledScrollBar options={{ suppressScrollX: true }}>
            <Box p={0} flexGrow={1} position="relative">
              <Outlet />
            </Box>
            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </StyledScrollBar>
        )}

        {!settings.perfectScrollbar && (
          <ContentBox options={{ suppressScrollX: true }}>
            <Box p={0} flexGrow={1} position="relative">
              <Outlet />
            </Box>
            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </ContentBox>
        )}

        {settings.footer.show && settings.footer.fixed && <Footer />}
      </Layout2Root>
      {settings.secondarySidebar.show && <SecondarySidebar />}
    </Layout2Container>
  );
};

export default Layout2;

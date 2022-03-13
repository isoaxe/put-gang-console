import { H5 } from "../Typography";
import BadgeSelected from "./BadgeSelected";
import Scrollbar from "react-perfect-scrollbar";
import useSettings from "app/hooks/useSettings";
import React, { Fragment, useState } from "react";
import { styled, Box, useTheme } from "@mui/system";
import { themeShadows } from "../MatxTheme/themeColors";
import {
  Icon,
  Card,
  Link,
  Button,
  Drawer,
  IconButton,
  ThemeProvider,
} from "@mui/material";

const MaxCustomaizer = styled("div")(({ theme }) => ({
  height: "100vh",
  width: 320,
  position: "fixed",
  top: 0,
  right: 0,
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  paddingBottom: "32px",
  boxShadow: themeShadows[12],
  background: theme.palette.background.default,
  "& .helpText": {
    margin: "0px .5rem 1rem",
  },
}));

const LayoutBox = styled(BadgeSelected)(() => ({
  width: "100%",
  height: "152px !important",
  cursor: "pointer",
  marginTop: "12px",
  marginBottom: "12px",
  "& .layout-name": {
    display: "none",
  },
  "&:hover .layout-name": {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    background: "rgba(0,0,0,0.3)",
    zIndex: 12,
  },
}));

const Controller = styled("div")(() => ({
  minHeight: 58,
  padding: "14px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
  boxShadow: themeShadows[6],
}));

const IMG = styled("img")(() => ({
  width: "100%",
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "16px",
  paddingRight: "16px",
}));

const MatxCustomizer = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { settings, updateSettings } = useSettings();
  const theme = useTheme();
  const secondary = theme.palette.text.secondary;

  const closeSidebar = () => {
    updateSettings({
      secondarySidebar: { open: false },
    });
  };
  const handleTabChange = (index) => {
    setTabIndex(index);
  };
  let activeTheme = { ...settings.themes[settings.activeTheme] };

  return (
    <Fragment>
      <ThemeProvider theme={activeTheme}>
        <Drawer
          anchor={"right"}
          open={true}
          variant="temporary"
          onClose={closeSidebar}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <MaxCustomaizer>
            <Controller>
              <Box display="flex">
                <Icon className="icon" color="primary">
                  settings
                </Icon>
                <H5 sx={{ ml: 1, fontSize: "1rem" }}>Theme Settings</H5>
              </Box>
              <IconButton onClick={closeSidebar}>
                <Icon className="icon">close</Icon>
              </IconButton>
            </Controller>
            <Box px={3} mb={2} display="flex">
              <Button
                variant="outlined"
                color={tabIndex === 0 ? "secondary" : "primary"}
                onClick={() => handleTabChange(0)}
                sx={{ mr: 2 }}
              >
                Demos
              </Button>
              <Button
                variant="outlined"
                color={tabIndex === 1 ? "secondary" : "primary"}
                onClick={() => handleTabChange(1)}
              >
                Settings
              </Button>
            </Box>

            <StyledScrollBar options={{ suppressScrollX: true }}>
              {tabIndex === 0 && (
                <Box sx={{ mb: 4, mx: 3 }}>
                  <Box sx={{ color: secondary }}>Layouts</Box>

                  <Box display="flex" flexDirection="column">
                    {demoLayouts.map((layout) => (
                      <LayoutBox
                        color="secondary"
                        badgeContent={"Pro"}
                        invisible={!layout.isPro}
                        key={layout.name}
                      >
                        <Card
                          sx={{
                            position: "relative",
                          }}
                          onClick={() => updateSettings(layout.options)}
                          elevation={4}
                        >
                          <Box
                            sx={{
                              overflow: "hidden",
                            }}
                            className="layout-name"
                          >
                            <Button variant="contained" color="secondary">
                              {layout.name}
                            </Button>
                          </Box>

                          <IMG src={layout.thumbnail} alt={layout.name} />
                        </Card>
                      </LayoutBox>
                    ))}
                  </Box>
                </Box>
              )}

              {/* END LAYOUT */}
              {tabIndex === 1 && (
                <div>
                  <div className="helpText">
                    We used React context API to control layout. Check out the{" "}
                    <Link
                      href="http://demos.ui-lib.com/matx-react-doc/layout.html"
                      target="_blank"
                    >
                      Documentation
                    </Link>
                  </div>
                </div>
              )}
            </StyledScrollBar>
          </MaxCustomaizer>
        </Drawer>
      </ThemeProvider>
    </Fragment>
  );
};

const demoLayouts = [
  {
    name: "Light Sidebar",
    thumbnail: "/assets/images/screenshots/layout1-customizer.png",
    isPro: false,
    options: {
      activeLayout: "layout1",
      activeTheme: "blue",
      layout1Settings: {
        leftSidebar: {
          mode: "full",
          theme: "whiteBlue",
          bgOpacity: 0.98,
        },
        topbar: {
          theme: "blueDark",
          fixed: true,
        },
      },
      footer: {
        theme: "slateDark1",
      },
    },
  },
  {
    name: "Compact Sidebar",
    thumbnail: "/assets/images/screenshots/layout5-customizer.png",
    isPro: false,
    options: {
      activeLayout: "layout1",
      activeTheme: "blue",
      layout1Settings: {
        leftSidebar: {
          mode: "compact",
          theme: "slateDark1",
          bgOpacity: 0.92,
        },
        topbar: {
          theme: "whiteBlue",
          fixed: true,
        },
      },
    },
  },
  {
    name: "Dark Sidebar",
    thumbnail: "/assets/images/screenshots/layout1-blue-customizer.png",
    isPro: false,
    options: {
      activeLayout: "layout1",
      activeTheme: "blue",
      layout1Settings: {
        leftSidebar: {
          mode: "full",
          theme: "slateDark1",
          bgOpacity: 0.92,
        },
        topbar: {
          theme: "blueDark",
          fixed: true,
        },
      },
    },
  },
  {
    name: "Dark Theme",
    thumbnail: "/assets/images/screenshots/layout3-customizer.png",
    isPro: false,
    options: {
      activeLayout: "layout1",
      activeTheme: "purpleDark1",
      layout1Settings: {
        leftSidebar: {
          mode: "full",
          theme: "slateDark1",
          bgOpacity: 0.92,
        },
        topbar: {
          theme: "purpleDark1",
          fixed: true,
        },
      },
      footer: {
        theme: "slateDark1",
      },
    },
  },
  {
    name: "Horizontal Navigation",
    thumbnail: "/assets/images/screenshots/layout4-customizer.png",
    isPro: true,
    options: {
      activeLayout: "layout2",
      activeTheme: "purple1",
      layout2Settings: {
        mode: "full",
      },
      footer: {
        theme: "slateDark1",
      },
    },
  },
];

export default MatxCustomizer;

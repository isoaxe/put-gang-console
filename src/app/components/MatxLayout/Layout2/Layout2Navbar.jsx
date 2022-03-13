import React from "react";
import { Box, styled } from "@mui/system";
import { navigations } from "../../../navigations";
import MatxHorizontalNav from "app/components/MatxHorizontalNav/MatxHorizontalNav";

const NavbarRoot = styled("div")(({ theme }) => ({
  "&, & .horizontal-nav ul ul": {
    zIndex: 3999,
    background: theme.palette.primary.main,
  },
  "& .horizontal-nav a, & .horizontal-nav label": {
    color: theme.palette.text.primary,
  },
  "& .horizontal-nav ul li ul li:hover, & .horizontal-nav ul li ul li.open": {
    background: theme.palette.primary.dark,
  },
}));

const Layout2Navbar = () => {
  return (
    <NavbarRoot className="navbar">
      <Box pl={3}>
        <MatxHorizontalNav navigation={navigations} max={6} />
      </Box>
    </NavbarRoot>
  );
};

export default Layout2Navbar;

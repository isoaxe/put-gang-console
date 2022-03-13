import React from "react";
import { styled, Box } from "@mui/system";
import useSettings from "app/hooks/useSettings";

const BrandRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 18px 20px 29px",
}));

const Brand = ({ children }) => {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot>
      <Box>
        {mode === "compact" ? (
          <img
            src="/assets/images/put-gang-icon.png"
            alt="Put Gang Icon"
            width="50px"
            style={{ marginLeft: "-14px" }}
          />
        ) : (
          <img
            src="/assets/images/put-gang-banner.png"
            alt="Put Gang Banner"
            width="150px"
          />
        )}
      </Box>
      <Box
        className="sidenavHoverShow"
        sx={{ display: mode === "compact" ? "none" : "block" }}
      >
        {children || null}
      </Box>
    </BrandRoot>
  );
};

export default Brand;

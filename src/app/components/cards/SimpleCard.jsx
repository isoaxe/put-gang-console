import React from "react";
import { Card } from "@mui/material";
import { styled, Box } from "@mui/system";

const CardRoot = styled(Card)(() => ({
  height: "100%",
  padding: "20px 24px",
  marginBottom: "25px",
}));

const CardTitle = styled("div")(({ subTitle }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  marginBottom: !subTitle && "16px",
}));

const SimpleCard = ({ children, title, subtitle, icon }) => {
  return (
    <CardRoot elevation={6}>
      <CardTitle subTitle={subtitle}>{title}</CardTitle>
      {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
      {children}
    </CardRoot>
  );
};

export default SimpleCard;

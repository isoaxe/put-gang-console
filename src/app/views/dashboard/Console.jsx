import React, { useContext } from "react";
import { styled } from "@mui/system";
import DataContext from "app/contexts/DataContext";
import ActivityList from "./../list/ActivityList";
import StatCard3 from "./shared/StatCard3";
import { H3 } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";

const AnalyticsRoot = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: {
    margin: "16px",
  },
}));

const FlexBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "24px",
}));

const Console = () => {
  const { allStats, role } = useContext(DataContext);
  const uid = useAuth().user.id;
  let userStats = {};
  if (allStats.length && ["admin", "level-1", "level-2"].includes(role)) {
    userStats = allStats.find((stats) => stats.uid === uid);
  }

  return (
    <AnalyticsRoot>
      <FlexBox>
        <H3 sx={{ m: 0 }}>Overview</H3>
      </FlexBox>

      <StatCard3 userStats={userStats} />

      <H3 sx={{ marginTop: 8 }}>Activity</H3>
      <ActivityList />
    </AnalyticsRoot>
  );
};

export default Console;

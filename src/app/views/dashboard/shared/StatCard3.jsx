import React from "react";
import { Box, useTheme } from "@mui/system";
import { Grid, Card, IconButton, Icon } from "@mui/material";
import { H3, Paragraph } from "app/components/Typography";
import { numToCurrency } from "./../../../utils/helpers";
import { ADMIN_EMAIL } from "./../../../utils/constants";

const StatCard3 = (props) => {
  const { userStats } = props;
  let [revenue, sales, mrr, paid, unpaid, totalMrr, totalRevenue] =
    Array(7).fill(0);
  if (userStats && Object.keys(userStats).length) {
    ({ revenue, sales, mrr, paid, unpaid, totalMrr, totalRevenue } = userStats);
  }
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  let statList = [
    {
      icon: "attach_money",
      amount: numToCurrency(revenue),
      title: "Revenue",
    },
    {
      icon: "ballot",
      amount: numToCurrency(mrr),
      title: "MRR",
    },
    {
      icon: "price_check",
      amount: numToCurrency(paid),
      title: "Paid",
    },
    {
      icon: "money_off",
      amount: numToCurrency(unpaid),
      title: "Unpaid",
    },
    {
      icon: "bar_chart",
      amount: sales,
      title: "Sales",
    },
  ];
  const additionalStats = [
    {
      icon: "attach_money",
      amount: numToCurrency(totalRevenue),
      title: "Total Revenue",
    },
    {
      icon: "ballot",
      amount: numToCurrency(totalMrr),
      title: "Total MRR",
    },
  ];
  if (userStats?.email === ADMIN_EMAIL) {
    statList = statList.concat(additionalStats);
  }

  return (
    <div>
      <Grid container spacing={3}>
        {statList.map((item, ind) => (
          <Grid key={item.title} item md={3} sm={6} xs={12}>
            <Card elevation={3} sx={{ p: "20px", display: "flex" }}>
              <div>
                <IconButton
                  size="small"
                  sx={{
                    padding: "8px",
                    background: "rgba(0, 0, 0, 0.01)",
                  }}
                >
                  <Icon sx={{ color: textMuted }}>{item.icon}</Icon>
                </IconButton>
              </div>
              <Box ml={2}>
                <H3 sx={{ mt: "-4px", fontSize: "32px" }}>{item.amount}</H3>
                <Paragraph sx={{ m: 0, color: textMuted }}>
                  {item.title}
                </Paragraph>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default StatCard3;

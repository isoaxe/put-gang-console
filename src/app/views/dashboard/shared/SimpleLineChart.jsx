import RechartCreator from "app/components/charts/RechartCreator";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const SimpleLineChart = (props) => {
  const { data, height, width } = props;
  return (
    <RechartCreator height={height} width={width}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="Subscriptions"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Cancellations"
          activeDot={{ r: 5 }}
          stroke="#82ca9d"
        />
        <Line
          type="monotone"
          dataKey="Net Movement"
          activeDot={{ r: 5 }}
          stroke="#ffc658"
        />
      </LineChart>
    </RechartCreator>
  );
};

export default SimpleLineChart;

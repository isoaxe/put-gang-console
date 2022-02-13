import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import RechartCreator from 'app/components/charts/RechartCreator'


const StackedAreaChart = (props) => {
    const { data, height, width } = props;
    return (
        <RechartCreator height={height} width={width}>
            <AreaChart
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
                <Area
                    type="monotone"
                    dataKey="Net Revenues"
                    stackId="1"
                    //   stroke="#8884d8"
                    fill="#9068be"
                />
                <Area
                    type="monotone"
                    dataKey="Affiliate Revenues"
                    stackId="1"
                    //   stroke="#82ca9d"
                    fill="#7467ef"
                />
            </AreaChart>
        </RechartCreator>
    )
}

export default StackedAreaChart

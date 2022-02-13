import React from 'react'
import { useTheme } from '@mui/system'
import ReactEcharts from 'echarts-for-react'

const ComparisonChart2 = ({ height }) => {
    const { palette } = useTheme()

    const option = {
        grid: {
            left: '6%',
            bottom: '10%',
            right: '1%',
        },
        legend: {
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        color: [
            palette.primary.dark,
            palette.primary.light,
            palette.secondary.light,
            palette.error.light,
        ],
        barMaxWidth: '10px',
        tooltip: {},
        dataset: {
            source: [
                ['Month', 'Subscribed', 'Cancelled', 'Net Movement'],
                ['Jan', 30, 12, 18],
                ['Feb', 33, 7, 26],
                ['Mar', 37, 14, 23],
                ['Apr', 40, 22, 18],
                ['May', 45, 13, 32],
                ['June', 41, 15, 26],
                ['July', 43, 17, 26],
                ['August', 55, 25, 30],
                ['September', 60, 30, 30],
                ['October', 43, 25, 28],
                ['November', 25, 14, 11],
                ['December', 55, 30, 25],
            ],
        },
        xAxis: {
            type: 'category',
            axisLine: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        yAxis: {
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                // show: false
                lineStyle: {
                    color: palette.text.secondary,
                    opacity: 0.15,
                },
            },
            axisLabel: {
                color: palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {
                type: 'bar',
                itemStyle: {
                    barBorderRadius: [10, 10, 0, 0],
                },
            },
            {
                type: 'bar',
                itemStyle: {
                    barBorderRadius: [10, 10, 0, 0],
                },
            },
            {
                type: 'bar',
                itemStyle: {
                    barBorderRadius: [10, 10, 0, 0],
                },
            },
        ],
    }

    return <ReactEcharts style={{ height: height }} option={option} />
}

export default ComparisonChart2

// src/components/MultilineChart.js
import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { colorCode, datwiseData } from '../constants/totalActivities.constant';

const MultilineChart = ({selectEmployee}) => {
    
  useEffect(() => {
    const chartDom = document.getElementById('multiline-chart');
    const myChart = echarts.init(chartDom);
    let xAxisData
    let totalData = []

    const legendData = Object.keys(datwiseData?.[selectEmployee?.value])

    Object.keys(datwiseData?.[selectEmployee?.value]).forEach((activity)=>{
        xAxisData=Object.keys(datwiseData?.[selectEmployee?.value]?.[activity])
        const activityData = {
            name: activity,
            type: 'line',
            areaStyle: {},
            stack: 'Total',
            itemStyle: {
              color: colorCode?.[activity],
            },
            emphasis: {
              focus: 'series',
            },
            data: Object.values(datwiseData?.[selectEmployee?.value]?.[activity]),
          }
          totalData = [...totalData,activityData]
    })

    const option = {
      title: {
        text: 'Day Wise Activity Performance',
        left: 'center',
        textStyle: {
          color: '#333',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        type: 'scroll', 
        data: legendData,
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series: totalData,
    };

    myChart.setOption(option);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [selectEmployee.value]);

  return <div id="multiline-chart" style={{ width: '100%', height: '400px' }} />;
};

export default MultilineChart;

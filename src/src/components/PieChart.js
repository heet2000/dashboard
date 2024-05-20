import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { totalActivities } from '../constants/totalActivities.constant';

const PieChart = ({selectEmployee}) => {
  useEffect(() => {
    // Initialize the chart
    const chartDom = document.getElementById('pie-chart');
    const myChart = echarts.init(chartDom);

    const convertedData = Object.entries(totalActivities?.[selectEmployee?.value]).map(([name, value]) => ({
      name,
      value,
    }));

    // Specify the chart configuration
    const option = {
      title: {
        text: 'Total Activity Performance',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        bottom:"bottom",
        data: convertedData
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: convertedData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    // Use the specified configuration and data to show the chart
    myChart.setOption(option);

    // Resize the chart on window resize
    const handleResize = () => {
      myChart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [selectEmployee.value]);

  return <div id="pie-chart" style={{ width: '100%', height: '400px' }} />;
};

export default PieChart;


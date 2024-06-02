import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import useDataStore from "@/store";
const dayjs = require('dayjs');

const Page: React.FC = () => {
  const [options, setOptions] = useState({});
  const data = useDataStore((state) => state.data)
  console.log('month', data)

  //当月的日期数组
  function getCurrentMonthDays() {
    const now = dayjs();
    const daysInMonth = now.daysInMonth();
    const daysArray = Array.from({ length: daysInMonth }, (v, k) => k + 1);
    return daysArray;
  }

  //当月的每日支出数组
  function getMonthlyExpenditures(data) {
    const now = dayjs();
    const currentMonth = now.month();
    const currentYear = now.year();
    const daysInMonth = now.daysInMonth();

    const expenditures = Array.from({ length: daysInMonth }, () => 0);

    data?.forEach(record => {
      const recordDate = dayjs(record.date);
      if (recordDate.month() === currentMonth && recordDate.year() === currentYear && record.moneytype === "支出") {
        const day = recordDate.date();
        expenditures[day - 1] += record.money;
      }
    });
    return expenditures;
  }

  //当月的每日收入数组
  function getMonthlyIncome(data) {
    const now = dayjs();
    const currentMonth = now.month();
    const currentYear = now.year();
    const daysInMonth = now.daysInMonth();

    const income = Array.from({ length: daysInMonth }, () => 0);

    data?.forEach(record => {
      const recordDate = dayjs(record.date);
      if (recordDate.month() === currentMonth && recordDate.year() === currentYear && record.moneytype === "收入") {
        const day = recordDate.date();
        income[day - 1] += record.money;
      }
    });
    return income;
  }

  const monthlyExpenditures = getMonthlyExpenditures(data);
  const monthlyIncome = getMonthlyIncome(data);
  const daysInCurrentMonth = getCurrentMonthDays();

  useEffect(() => {
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      legend: {
        data: ['收入', '支出']
      },
      xAxis: [
        {
          type: 'category',
          data: daysInCurrentMonth,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '收入',
          min: 0,
          max: 7500,
          interval: 1500,
          axisLabel: {
            formatter: '¥{value}'
          }
        },
        {
          type: 'value',
          name: '支出',
          min: 0,
          max: 7500,
          interval: 1500,
          axisLabel: {
            formatter: '¥{value}'
          }
        }
      ],
      series: [
        {
          name: '收入',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ¥ ';
            }
          },
          data: monthlyIncome,
        },
        {
          name: '支出',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ¥';
            }
          },
          data: monthlyExpenditures,
        }
      ]
    })
  }, [data])

  return <ReactECharts option={options} style={{ height: '400px', width: '100%' }} />;
};

export default Page;

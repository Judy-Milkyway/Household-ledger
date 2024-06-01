import { Cascader, Select } from "antd";
import ReactECharts from "echarts-for-react";
import { DataType, data } from "@/mock/data";
import { useState, useEffect } from "react";
import dayjs from 'dayjs';


export default function Graph() {
  const getInitialOptions = () => {
    const expenditureByType = data.filter(item => item.moneytype === '支出')
      .reduce((acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + curr.money;
        return acc;
      }, {});

    const pieData = Object.keys(expenditureByType).map(key => ({
      value: expenditureByType[key],
      name: key,
    }));

    return {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "0",
        left: "center",
        padding: 0,
      },
      series: [
        {
          name: "支出分类",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 30,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: pieData,
        },
      ],
    };
  };

  const [options, setOptions] = useState(getInitialOptions());

  const selectOptions = [
    {
      value: '支出',
      label: '支出',
      children: [
        {
          value: '支出类别',
          label: '按支出类别分类',
        },
        {
          value: '家庭成员',
          label: '按家庭成员分类',
        }
      ],
    },
    {
      value: '收入',
      label: '收入',
      children: [
        {
          value: '收入类别',
          label: '按收入类别分类',
        },
        {
          value: '家庭成员',
          label: '按家庭成员分类',
        }
      ],

    },
  ];

  const handleChange = (value) => {
    if (!value) {
      setOptions(getInitialOptions());
      return;
    }

    if (value[0] === '收入') {
      if (value[1] === '家庭成员') {
        const membersIncome = data.filter(item => item.moneytype === '收入')
          .reduce((acc, curr) => {
            acc[curr.role] = (acc[curr.role] || 0) + curr.money;
            return acc;
          }, {});

        const pieData = Object.keys(membersIncome).map(key => ({
          value: membersIncome[key],
          name: key,
        }));

        setOptions({
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "0",
            left: "center",
            padding: 0,
          },
          series: [
            {
              name: "收入分类",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              padAngle: 5,
              itemStyle: {
                borderRadius: 10,
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 30,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: pieData,
            },
          ],
        });
      } else if (value[1] === '收入类别') {
        const typeIncome = data.filter(item => item.moneytype === '收入')
          .reduce((acc, curr) => {
            acc[curr.type] = (acc[curr.type] || 0) + curr.money;
            return acc;
          }, {});

        const pieData = Object.keys(typeIncome).map(key => ({
          value: typeIncome[key],
          name: key,
        }));

        setOptions({
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "0",
            left: "center",
            padding: 0,
          },
          series: [
            {
              name: "收入分类",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              padAngle: 5,
              itemStyle: {
                borderRadius: 10,
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 30,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: pieData,
            },
          ],
        });
      }
    } else if (value[0] === '支出') {
      if (value[1] === '家庭成员') {
        const membersExpenditure = data.filter(item => item.moneytype === '支出')
          .reduce((acc, curr) => {
            acc[curr.role] = (acc[curr.role] || 0) + curr.money;
            return acc;
          }, {});

        const pieData = Object.keys(membersExpenditure).map(key => ({
          value: membersExpenditure[key],
          name: key,
        }));

        setOptions({
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "0",
            left: "center",
            padding: 0,
          },
          series: [
            {
              name: "支出分类",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              padAngle: 5,
              itemStyle: {
                borderRadius: 10,
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 30,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: pieData,
            },
          ],
        });
      } else if (value[1] === '支出类别') {
        const typeExpenditure = data.filter(item => item.moneytype === '支出')
          .reduce((acc, curr) => {
            acc[curr.type] = (acc[curr.type] || 0) + curr.money;
            return acc;
          }, {});

        const pieData = Object.keys(typeExpenditure).map(key => ({
          value: typeExpenditure[key],
          name: key,
        }));

        setOptions({
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "0",
            left: "center",
            padding: 0,
          },
          series: [
            {
              name: "支出分类",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              padAngle: 5,
              itemStyle: {
                borderRadius: 10,
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 30,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: pieData,
            },
          ],
        });
      }
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="h-[120px]">
        <Cascader options={selectOptions} onChange={handleChange} placeholder="请选择分类类别" />
      </div>
      <div className="mt-[20px]">
        <ReactECharts
          option={options}
          style={{ height: "500px", width: "100%" }}
        />
      </div>
    </div>
  );
}


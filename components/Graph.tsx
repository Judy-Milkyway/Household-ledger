import { Select } from "antd";
import ReactECharts from "echarts-for-react";

export default function Graph() {
  const options = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0",
      left: "center",
      padding:0
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        // label: {
        //   show: false,
        //   position: "center",
        // },
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
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  return (
    <div className="p-6 w-full">
      <div className="h-[120px]">
        <Select />
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

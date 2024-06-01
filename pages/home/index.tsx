import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  InputNumber,
  Radio,
  Select,
  Table,
  TableProps,
} from "antd/lib";
import { useState, useSyncExternalStore } from "react";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import { Menu } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import dynamic from "next/dynamic";
import General from "@/components/General";
import { DataType, data } from "@/mock/data";
import Graph from "@/components/Graph";

dayjs.extend(isoWeek);
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [open, setOpen] = useState(false);
  const [moneyType, setMoneyType] = useState("支出");
  const [showType, setShowType] = useState("1");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };



  const columns: TableProps<DataType>["columns"] = [
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      filters: [
        {
          text: "爸爸",
          value: "爸爸",
        },
        {
          text: "妈妈",
          value: "妈妈",
        },
        {
          text: "孩子",
          value: "孩子",
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value as string) === 0,
    },
    {
      title: "支出/收入",
      dataIndex: "moneytype",
      key: "moneytype",
      filters: [
        {
          text: "支出",
          value: "支出",
        },
        {
          text: "收入",
          value: "收入",
        },
      ],
      onFilter: (value, record) =>
        record.moneytype.indexOf(value as string) === 0,
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      filters: [
        {
          text: "支出",
          value: "支出",
          children: [
            {
              text: "三餐",
              value: "三餐",
            },
            {
              text: "交通",
              value: "交通",
            },
            {
              text: "日用品",
              value: "日用品",
            },
            {
              text: "衣服",
              value: "衣服",
            },
            {
              text: "话费网费",
              value: "话费网费",
            },
            {
              text: "医疗",
              value: "医疗",
            },
            {
              text: "住房",
              value: "住房",
            },
            {
              text: "其他",
              value: "其他",
            },
          ],
        },
        {
          text: "收入",
          value: "收入",
          children: [
            {
              text: "工资",
              value: "工资",
            },
            {
              text: "投资",
              value: "投资",
            },
            {
              text: "奖金",
              value: "奖金",
            },
            {
              text: "其他",
              value: "其他",
            },
          ],
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
      filters: getDateFilters(),
      onFilter: (value, record) => filterByDate(value as string, record.date),
    },
    {
      title: "价值",
      dataIndex: "money",
      key: "money",
      sorter: {
        compare: (a, b) => a.money - b.money,
        multiple: 1,
      },
    },
    {
      title: '操作',
      key: '操作',
      render: (_, record) => (
        <a>删除</a>
      ),
    },

  ];

  function getDateFilters() {
    const years = new Set<string>();
    const months = new Set<string>();
    const weeks = new Set<string>();
    const days = new Set<string>();

    data.forEach(record => {
      const date = dayjs(record.date);
      years.add(date.format("YYYY"));
      months.add(date.format("YYYY-MM"));
      weeks.add(`${date.isoWeekYear()}-W${date.isoWeek()}`);
      days.add(date.format("YYYY-MM-DD"));
    });

    return [
      {
        text: 'Year',
        value: 'year',
        children: Array.from(years).map(year => ({ text: year, value: year })),
      },
      {
        text: 'Month',
        value: 'month',
        children: Array.from(months).map(month => ({ text: month, value: month })),
      },
      {
        text: 'Week',
        value: 'week',
        children: Array.from(weeks).map(week => ({ text: week, value: week })),
      },
      {
        text: 'Day',
        value: 'day',
        children: Array.from(days).map(day => ({ text: day, value: day })),
      },
    ];
  }

  function filterByDate(value: string, date: string) {
    if (value.includes('W')) {
      const [year, week] = value.split('-W');
      return dayjs(date).isoWeekYear() === parseInt(year) && dayjs(date).isoWeek() === parseInt(week);
    }

    const dateFormat = value.length === 4 ? 'YYYY' : value.length === 7 ? 'YYYY-MM' : 'YYYY-MM-DD';
    return dayjs(date).format(dateFormat) === value;
  }



  const items = [
    { key: "1", label: "当月情况" },
    { key: "2", label: "表格展示" },
    { key: "3", label: "图表展示" },
    { key: '4', label: '退出登录' }
  ];

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-[10%] bg-slate-100 flex justify-between items-center pl-[40px] pr-[40px]">
        <span className="text-2xl font-bold leading-[80px]">家庭记账本</span>
        <span
          className="text-2xl text-slate-400 leading-[80px]"
          onClick={() => {
            showDrawer();
          }}
        >
          添加
        </span>
      </div>
      <div className="flex">
        <div className="w-[20%] h-screen">
          <Menu
            className="w-[100%]"
            defaultSelectedKeys={["1"]}
            items={items}
            onClick={(item) => {
              setShowType(item.key);
            }}
          ></Menu>
        </div>
        {showType === "1" && <General />}
        {showType === "2" && (
          <div className="w-[80%] h-[screen] bg-slate-50 flex flex-col items-center">
            <Table
              columns={columns}
              dataSource={data}
              className="w-[700px] max-h-[400px]"
            />
          </div>
        )}
        {
          showType === '3' && (
            <Graph />
          )
        }
      </div>

      <Drawer
        title="添加记录"
        // closable={false}
        onClose={onClose}
        open={open}
        width={500}
      >
        <Form
          //  labelCol={{ span: 4 }}
          //  wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 450 }}
        >
          <Form.Item label="家庭成员">
            <Select>
              <Select.Option value="father">爸爸</Select.Option>
              <Select.Option value="mother">妈妈</Select.Option>
              <Select.Option value="child">孩子</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="支出/收入">
            <Select
              onChange={(value) => {
                setMoneyType(value);
              }}
            >
              <Select.Option value="支出">支出</Select.Option>
              <Select.Option value="收入">收入</Select.Option>
            </Select>
          </Form.Item>
          {moneyType === "支出" && (
            <Form.Item label="类别">
              <Select>
                <Select.Option value="三餐">三餐</Select.Option>
                <Select.Option value="日用品">日用品</Select.Option>
                <Select.Option value="衣服">衣服</Select.Option>
                <Select.Option value="交通">交通</Select.Option>
                <Select.Option value="话费网费">话费网费</Select.Option>
                <Select.Option value="医疗">医疗</Select.Option>
                <Select.Option value="住房">住房</Select.Option>
                <Select.Option value="其他">其他</Select.Option>
              </Select>
            </Form.Item>
          )}
          {moneyType === "收入" && (
            <Form.Item label="类别">
              <Select>
                <Select.Option value="工资">工资</Select.Option>
                <Select.Option value="投资">投资</Select.Option>
                <Select.Option value="奖金">奖金</Select.Option>
                <Select.Option value="其他">其他</Select.Option>
              </Select>
            </Form.Item>
          )}
          <Form.Item label="日期">
            <DatePicker
              onChange={(date, dateString) => {
                console.log(date, "string", dateString);
              }}
            />
          </Form.Item>
          <Form.Item label="价值">
            <InputNumber prefix="￥" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

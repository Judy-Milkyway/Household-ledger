import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, DatePicker, Drawer, Form, InputNumber, Radio, Select, Table, TableProps } from 'antd/lib';
import { useState, useSyncExternalStore } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Menu } from "antd";
import { MenuItemType } from "antd/es/menu/interface";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [open, setOpen] = useState(false);
  const [moneyType, setMoneyType] = useState('支出')
  const [showType, setShowType] = useState('1')


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  interface DataType {
    key: string;
    role: string;
    moneytype: string;
    type: string;
    date: Dayjs;
    money: number;

  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      filters: [
        {
          text: '爸爸',
          value: '爸爸'
        }, {
          text: '妈妈',
          value: '妈妈'
        }, {
          text: '孩子',
          value: '孩子'
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value as string) === 0,
    },
    {
      title: '支出/收入',
      dataIndex: 'moneytype',
      key: 'moneytype',
      filters: [
        {
          text: '支出',
          value: '支出'
        }, {
          text: '收入',
          value: '收入'
        },
      ],
      onFilter: (value, record) => record.moneytype.indexOf(value as string) === 0,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      filters: [
        {
          text: '支出',
          value: '支出',
          children: [
            {
              text: '三餐',
              value: '三餐',
            },
            {
              text: '交通',
              value: '交通',
            }, {
              text: '日用品',
              value: '日用品',
            }, {
              text: '衣服',
              value: '衣服',
            }, {
              text: '话费网费',
              value: '话费网费',
            }, {
              text: '医疗',
              value: '医疗',
            }, {
              text: '住房',
              value: '住房',
            }, {
              text: '其他',
              value: '其他',
            }
          ],
        }, {
          text: '收入',
          value: '收入',
          children: [
            {
              text: '工资',
              value: '工资',
            },
            {
              text: '投资',
              value: '投资',
            }, {
              text: '奖金',
              value: '奖金',
            }, {
              text: '其他',
              value: '其他',
            },
          ],
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      render: (date: Dayjs) => date.format('YYYY-MM-DD')
    },
    {
      title: '价值',
      dataIndex: 'money',
      key: 'money',
      sorter: {
        compare: (a, b) => a.money - b.money,
        multiple: 1,
      },

    },
  ]

  const data: DataType[] = [
    {
      key: '1',
      role: '爸爸',
      moneytype: '收入',
      type: '工资',
      date: dayjs('2024-05-12'),
      money: 5000,
    }, {
      key: '2',
      role: '妈妈',
      moneytype: '支出',
      type: '三餐',
      date: dayjs('2024-05-18'),
      money: 120,
    }, {
      key: '3',
      role: '妈妈',
      moneytype: '收入',
      type: '工资',
      date: dayjs('2024-05-10'),
      money: 5000,
    }, {
      key: '4',
      role: '孩子',
      moneytype: '支出',
      type: '日用品',
      date: dayjs('2024-05-14'),
      money: 50,
    }, {
      key: '5',
      role: '爸爸',
      moneytype: '支出',
      type: '交通',
      date: dayjs('2024-05-22'),
      money: 200,
    }, {
      key: '6',
      role: '妈妈',
      moneytype: '收入',
      type: '投资',
      date: dayjs('2024-05-24'),
      money: 1000,
    }, {
      key: '7',
      role: '孩子',
      moneytype: '支出',
      type: '交通',
      date: dayjs('2024-05-25'),
      money: 15,
    }, {
      key: '8',
      role: '爸爸',
      moneytype: '收入',
      type: '投资',
      date: dayjs('2024-05-29'),
      money: 1000,
    }
  ]

  const items = [
    { key: '1', label: '当月情况' }, { key: '2', label: '表格展示' }, { key: '3', label: '图标展示' }, { key: '4', label: '纯文字展示' }
  ]

  return (
    <div className="w-screen h-screen">
      <div className='w-full h-[10%] bg-slate-100 flex justify-between items-center pl-[40px] pr-[40px]'>
        <span className="text-2xl font-bold leading-[80px]">家庭记账本</span>
        <span className="text-2xl text-slate-400 leading-[80px]" onClick={() => { showDrawer() }}>添加</span>
      </div>
      <div className="flex">
        <div className="w-[20%] h-[90%]">
          <Menu className="w-[100%]" defaultSelectedKeys={['1']} items={items} onClick={(item) => { setShowType(item.key) }}></Menu>
        </div>
        {showType === '1' && <div className="w-[80%] h-[90%] bg-slate-50 flex flex-col items-center">
          <div className="w-[90%] h-[100px] shadow-lg shadow-slate-200 rounded-lg mt-[40px] flex items-center justify-evenly">
            <div className="flex flex-col justify-center items-center">
              <div className="text-xl font-bold text-slate-500">本月支出:</div>
              <div className="text-2xl font-bold">0.00</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-xl font-bold text-slate-500">本月收入:</div>
              <div className="text-2xl font-bold">0.00</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-xl font-bold text-slate-500">本月结余:</div>
              <div className="text-2xl font-bold">0.00</div>
            </div>
          </div>
          <div className="mt-[20px]">
          </div>
        </div>}
        {showType === '2' && <Table columns={columns} dataSource={data} className="w-[700px] max-h-[400px]" />}
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
              onChange={(value) => { setMoneyType(value) }}
            >
              <Select.Option value="支出">支出</Select.Option>
              <Select.Option value="收入">收入</Select.Option>
            </Select>
          </Form.Item>
          {moneyType === '支出' && <Form.Item label="类别">
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
          </Form.Item>}
          {moneyType === '收入' && <Form.Item label="类别">
            <Select>
              <Select.Option value="工资">工资</Select.Option>
              <Select.Option value="投资">投资</Select.Option>
              <Select.Option value="奖金">奖金</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>}
          <Form.Item label="日期">
            <DatePicker onChange={((date, dateString) => { console.log(date, "string", dateString) })} />
          </Form.Item>
          <Form.Item label="价值">
            <InputNumber prefix="￥" style={{ width: '100%' }} />
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

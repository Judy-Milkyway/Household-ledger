
import dynamic from "next/dynamic";
import { useState } from "react";
import { DataType, data } from "@/mock/data";
const dayjs = require('dayjs');
const Doubleaxes = dynamic(() => import("./chart"), {
  ssr: false,
});

export default function General() {

  function calculateMonthlySummary(data) {
    const now = dayjs();
    const currentMonth = now.month();
    const currentYear = now.year();

    let totalIncome = 0;
    let totalExpenditure = 0;

    data.forEach(record => {
      const recordDate = dayjs(record.date);
      if (recordDate.month() === currentMonth && recordDate.year() === currentYear) {
        if (record.moneytype === "收入") {
          totalIncome += record.money; // 计算总收入
        } else if (record.moneytype === "支出") {
          totalExpenditure += record.money; // 计算总支出
        }
      }
    });

    const balance = totalIncome - totalExpenditure; // 计算结余

    return {
      totalIncome,
      totalExpenditure,
      balance
    };
  }
  const monthlySummary = calculateMonthlySummary(data);

  return (
    <div className="w-[80%] h-[screen] bg-slate-50 flex flex-col items-center">
      <div className="w-[90%] h-[100px] shadow-lg shadow-slate-200 rounded-lg mt-[40px] flex items-center justify-evenly">
        <div className="flex flex-col justify-center items-center">
          <div className="text-xl font-bold text-slate-500">本月支出:</div>
          <div className="text-2xl font-bold">{monthlySummary.totalExpenditure}</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-xl font-bold text-slate-500">本月收入:</div>
          <div className="text-2xl font-bold">{monthlySummary.totalIncome}</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-xl font-bold text-slate-500">本月结余:</div>
          <div className="text-2xl font-bold">{monthlySummary.balance}</div>
        </div>
      </div>
      <div className="mt-[80px] w-full px-10">
        <Doubleaxes />
      </div>
    </div>
  );
}

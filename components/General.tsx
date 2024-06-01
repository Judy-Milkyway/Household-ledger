
import dynamic from "next/dynamic";
import { useState } from "react";
const Doubleaxes = dynamic(() => import("./chart"), {
    ssr: false,
  });

export default function General() {

  return (
    <div className="w-[80%] h-[screen] bg-slate-50 flex flex-col items-center">
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
      <div className="mt-[80px] w-full px-10">
        <Doubleaxes />
      </div>
    </div>
  );
}

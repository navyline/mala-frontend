"use client";

import { PlusCircle, MinusCircle, Clock } from 'lucide-react';

interface PointHistoryData {
  id: string;
  action_type: 'EARN' | 'REDEEM';
  points: number;
  description: string;
  created_at: string;
}

export default function PointHistory({ data }: { data: PointHistoryData[] | null }) {

  //  no history data or empty state
  if (!data || data.length === 0) {
    return (
      <div className="w-full max-w-md bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
        <Clock className="mx-auto text-gray-200 mb-2" size={40} />
        <p className="text-gray-400 text-sm font-medium">ยังไม่มีประวัติคะแนน</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex items-center gap-2 px-2">
        <div className="w-1.5 h-5 bg-orange-600 rounded-full" />
        <h3 className="text-lg font-bold text-gray-800">ประวัติคะแนน</h3>
      </div>

      <div className="space-y-3">
        {data.map((item) => {
          const isEarn = item.action_type === 'EARN';
          
          return (
            <div key={item.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50 flex justify-between items-center hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${
                  isEarn ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {isEarn ? <PlusCircle size={24} /> : <MinusCircle size={24} />}
                </div>

                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 text-base">
                    {isEarn ? 'ได้รับคะแนน' : 'ใช้คะแนนแลก'}
                  </span>
                  
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                    {item.description || (isEarn ? 'สะสมแต้มจากการซื้อ' : 'แลกรับส่วนลด')}
                  </p>

                  {/* Time and Date */}
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-2 font-medium">
                    <Clock size={12} />
                    <span>
                      {new Date(item.created_at).toLocaleDateString('th-TH', {
                        day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'
                      })} น.
                    </span>
                  </div>
                </div>
              </div>

              {/* Points */}
              <div className="text-right flex flex-col items-end">
                <span className={`text-xl font-black tabular-nums ${
                  isEarn ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isEarn ? `+${item.points}` : item.points}
                </span>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Points</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
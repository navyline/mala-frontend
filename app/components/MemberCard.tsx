"use client";

import { Flame, Phone, Calendar, ClipboardClock } from 'lucide-react';
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';


interface MemberData {
  name: string;
  total_points: number;
  phone: string;
  number_code: string;
  created_at: Timestamp;
}

export default function MemberCard({ data }: { data: MemberData | null }) {
  if (!data) return

  return (
    <div className="w-full max-w-md flex flex-col gap-0 shadow-2xl rounded-3xl overflow-hidden">
      
      {/*  */}
      <div className="bg-orange-500 p-6 text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
          <Flame size={180} fill="currentColor" />
        </div>

        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <p className="text-orange-100 text-[10px] uppercase tracking-widest font-bold opacity-80">Mala Member</p>
            <h2 className="text-2xl font-bold mt-1">{data.name}</h2>
          </div>
          <Link href="/history" className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/10">
            <ClipboardClock size={20} />
          </Link>
        </div>

        <div className="mb-4 relative z-10">
          <p className="text-orange-100 text-[10px] uppercase font-medium">คะแนนสะสม</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tighter tabular-nums">{data.total_points?.toLocaleString()}</span>
            <span className="text-sm font-bold opacity-90 uppercase">Points</span>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-white p-6 flex flex-col items-center border-t-2 border-dashed border-gray-100 relative">
        <div className="bg-white p-3 rounded-2xl shadow-inner border border-gray-50 mb-4">
          <QRCodeSVG 
            value={data.number_code} 
            size={140}
            level="H"
          />
        </div>
        
        {/* data under QR Code */}
        <div className="text-center">
          <p className="text-lg font-mono font-bold tracking-[0.3em] text-gray-800 uppercase">
            {data.number_code}
          </p>
          <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Phone size={10}/> {data.phone}</div>
            <div className="flex items-center gap-1"><Calendar size={10}/> วันที่สมัคร: {new Date(data.created_at).toLocaleDateString('th-TH', {
              day: '2-digit', month: 'short', year: '2-digit'
            })}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
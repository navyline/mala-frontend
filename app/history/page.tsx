"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { ChevronLeft, Loader2, Trophy } from 'lucide-react';
import PointHistory from '@/app/components/PointHistory';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('access_token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const memberRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/me/points`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!memberRes.ok) {
           throw new Error('Failed to fetch member');
        }
        
        const member = await memberRes.json();

        const historyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/history/${member.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (historyRes.ok) {
          const rawData = await historyRes.json();
          
          if (rawData.message) {
            setHistory([]);
          } else {
            const extractedHistories = rawData.flatMap((tx: any) => tx.point_histories || []);
            
            // sort by created_at descending
            const sortedHistories = extractedHistories.sort((a: any, b: any) => 
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );

            setHistory(sortedHistories);
          }
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-orange-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header Bar */}
      <header className="bg-white px-4 py-5 border-b flex items-center sticky top-0 z-20">
        <button 
          onClick={() => router.back()} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">ประวัติคะแนน</h1>
      </header>

      <main className="max-w-md mx-auto p-4 py-8 flex flex-col items-center">
        <div className="w-full bg-white border border-orange-100 p-6 rounded-3xl mb-8 flex items-center gap-4 shadow-sm">
          <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
            <Trophy size={32} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase">รายการทั้งหมด</p>
            <p className="text-2xl font-black text-gray-800">
              {history.length} <span className="text-sm font-normal">รายการ</span>
            </p>
          </div>
        </div>

        {/* PointHistory Component */}
        <PointHistory data={history} />

      </main>
    </div>
  );
}
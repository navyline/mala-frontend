"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Navbar from './components/Navbar';
import MemberCard from './components/MemberCard';
import { Loader2 } from 'lucide-react';

export default function MembershipPage() {
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch member data on component mount
    const fetchMember = async () => {
      const token = Cookies.get('access_token');
      
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/me/points`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setMember(data);
        } 
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [router]);  // refetch when route changes (e.g. after login/logout)

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Navbar />
      <main className="flex flex-col items-center py-10 px-4 space-y-6">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">ระบบ Membership</h1>
          
          {/* sent member data to MemberCard component */}
          <MemberCard data={member} />
          
        </div>
      </main>
    </div>
  );
}
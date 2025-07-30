import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAllMembers } from '../hooks/useAllMembers';

interface ChartData {
  name: string;
  joined: number;
  left: number;
}

type GroupBy = 'year' | 'month' | 'day';

const formatKey = (date: Date, groupBy: GroupBy) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  if (groupBy === 'year') return `${year}`;
  if (groupBy === 'month') return `${year}-${month}`;
  return `${year}-${month}-${day}`;
};

export const MemberStatsChart: React.FC = () => {
  const { data: members = [] } = useAllMembers();
  const [groupBy, setGroupBy] = useState<GroupBy>('day');

  const chartData: ChartData[] = useMemo(() => {
    const map = new Map<string, ChartData>();

    members.forEach((m) => {
      const joinDate = new Date(m.registeredAt);
      const joinKey = formatKey(joinDate, groupBy);
      if (!map.has(joinKey)) {
        map.set(joinKey, { name: joinKey, joined: 0, left: 0 });
      }
      map.get(joinKey)!.joined += 1;

      if (m.deletedAt) {
        const leaveDate = new Date(m.deletedAt);
        const leaveKey = formatKey(leaveDate, groupBy);
        if (!map.has(leaveKey)) {
          map.set(leaveKey, { name: leaveKey, joined: 0, left: 0 });
        }
        map.get(leaveKey)!.left += 1;
      }
    });

    const arr = Array.from(map.values());
    arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [members, groupBy]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md fade-in mt-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">회원 가입/탈퇴 통계</h2>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value as GroupBy)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="year">연도별</option>
          <option value="month">월별</option>
          <option value="day">일별</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} aria-label="member stats">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="joined" name="가입" fill="#4ade80" />
          <Bar dataKey="left" name="탈퇴" fill="#f87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MemberStatsChart;

import React from "react";
type Member = {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  status: "활성" | "대기중";
};

interface Props {
  data: Member[];
}

export const RecentMembersTable: React.FC<Props> = ({ data }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <div className="flex justify-between mb-4">
      <h2 className="text-lg font-semibold">최신 회원 목록</h2>
      <a href="#" className="text-sm text-indigo-600 hover:underline">
        더보기
      </a>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="pb-2">이름</th>
            <th className="pb-2">이메일</th>
            <th className="pb-2">가입일</th>
            <th className="pb-2">상태</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.id} className="border-b hover:bg-gray-50">
              <td className="py-3">{m.name}</td>
              <td className="py-3 text-sm text-gray-600">{m.email}</td>
              <td className="py-3 text-sm text-gray-600">{m.joinDate}</td>
              <td className="py-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    m.status === "활성"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {m.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

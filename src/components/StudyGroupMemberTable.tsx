import React, { useState } from 'react';
import LoadingSpinner from './common/LoadingSpinner';
import { useStudyGroupMembers } from '../hooks/useStudyGroupMembers';
import { updateStudyGroupMember, deleteStudyGroupMember } from '../utils/apiClient';
import type { StudyGroupMember } from '../types/responseTypes';

interface Props {
  studyGroupId: string;
}

const statuses = ['PENDING', 'APPROVED', 'REJECTED', 'DELETED'] as const;

const StudyGroupMemberTable: React.FC<Props> = ({ studyGroupId }) => {
  const { data: members = [], isLoading, error, refetch } = useStudyGroupMembers(studyGroupId);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<StudyGroupMember>>({});

  const startEdit = (m: StudyGroupMember) => {
    setEditId(m.studyMemberId);
    setForm({
      studyMemberStatus: m.studyMemberStatus,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({});
  };

  const handleChange = (
    field: keyof Pick<StudyGroupMember, 'studyMemberStatus'>,
    value: StudyGroupMember['studyMemberStatus'],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = async (id: number) => {
    try {
      await updateStudyGroupMember(studyGroupId, String(id), form);
      cancelEdit();
      refetch();
    } catch {
      alert('스터디원 정보 수정에 실패했습니다.');
    }
  };

  const removeMember = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteStudyGroupMember(studyGroupId, String(id));
      refetch();
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">스터디원 목록</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">유저 ID</th>
              <th className="py-3 px-6 text-left">유저 이름</th>
              <th className="py-3 px-6 text-left">역할</th>
              <th className="py-3 px-6 text-left">파트</th>
              <th className="py-3 px-6 text-left">상태</th>
              <th className="py-3 px-6 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-6 text-center">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-red-500">
                  스터디원 정보를 불러오지 못했습니다.
                </td>
              </tr>
            ) : members.length > 0 ? (
              members.map((m) => (
                <tr key={m.studyMemberId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{m.studyMemberUserId}</td>
                  <td className="py-3 px-6 text-left">{m.studyMemberUserName}</td>
                  <td className="py-3 px-6 text-left">{m.studyMemberRole}</td>
                  <td className="py-3 px-6 text-left">{m.studyMemberPart}</td>
                  <td className="py-3 px-6 text-left">
                    {editId === m.studyMemberId ? (
                      <select
                        className="border p-1 rounded"
                        value={form.studyMemberStatus as string}
                        onChange={(e) => handleChange('studyMemberStatus', e.target.value as StudyGroupMember['studyMemberStatus'])}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      m.studyMemberStatus
                    )}
                  </td>
                  <td className="py-3 px-6 text-center space-x-2">
                    {editId === m.studyMemberId ? (
                      <>
                        <button
                          onClick={() => saveEdit(m.studyMemberId)}
                          className="px-2 py-1 bg-green-500 text-white rounded"
                        >
                          저장
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-2 py-1 bg-gray-500 text-white rounded"
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(m)}
                          className="px-2 py-1 bg-yellow-500 text-white rounded"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => removeMember(m.studyMemberId)}
                          className="px-2 py-1 bg-red-600 text-white rounded"
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-6 text-center">
                  스터디원이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudyGroupMemberTable;

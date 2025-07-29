import React, { useState } from 'react';
import LoadingSpinner from './common/LoadingSpinner';
import {
  useProjectTeamMembers
} from '../hooks/useProjectTeamMembers';
import {
  updateProjectTeamMember,
  deleteProjectTeamMember
} from '../utils/apiClient';
import type { ProjectTeam } from '../types/responseTypes';

interface Props {
  projectId: string;
}

const roles = ['LEADER', 'MANAGER', 'MEMBER'] as const;
const parts = ['BACKEND', 'FRONTEND', 'FLUTTER', 'DEVOPS', 'PM', 'DESIGNER', 'PUBLISHER'] as const;
const statuses = ['PENDING', 'APPROVED', 'REJECTED'] as const;

const ProjectTeamTable: React.FC<Props> = ({ projectId }) => {
  const { data: members = [], isLoading, error, refetch } =
    useProjectTeamMembers(projectId);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<ProjectTeam>>({});

  const startEdit = (m: ProjectTeam) => {
    setEditId(m.projectTeamId);
    setForm({
      projectTeamRole: m.projectTeamRole,
      projectTeamPart: m.projectTeamPart,
      projectTeamMember: m.projectTeamMember,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({});
  };

  const handleChange = (
    field: keyof Pick<ProjectTeam, 'projectTeamRole' | 'projectTeamPart' | 'projectTeamMember'>,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = async (id: number) => {
    try {
      await updateProjectTeamMember(projectId, String(id), form);
      cancelEdit();
      refetch();
    } catch {
      alert('팀원 정보 수정에 실패했습니다.');
    }
  };

  const removeMember = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteProjectTeamMember(projectId, String(id));
      refetch();
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">팀원 정보를 불러오지 못했습니다.</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">팀원 목록</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">유저 ID</th>
              <th className="py-3 px-6 text-left">역할</th>
              <th className="py-3 px-6 text-left">파트</th>
              <th className="py-3 px-6 text-left">상태</th>
              <th className="py-3 px-6 text-left">가입일</th>
              <th className="py-3 px-6 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {members.length > 0 ? (
              members.map((m) => (
                <tr key={m.projectTeamId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{m.projectTeamUserId}</td>
                  <td className="py-3 px-6 text-left">
                    {editId === m.projectTeamId ? (
                      <select
                        className="border p-1 rounded"
                        value={form.projectTeamRole as string}
                        onChange={(e) => handleChange('projectTeamRole', e.target.value)}
                      >
                        {roles.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    ) : (
                      m.projectTeamRole
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {editId === m.projectTeamId ? (
                      <select
                        className="border p-1 rounded"
                        value={form.projectTeamPart as string}
                        onChange={(e) => handleChange('projectTeamPart', e.target.value)}
                      >
                        {parts.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    ) : (
                      m.projectTeamPart
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {editId === m.projectTeamId ? (
                      <select
                        className="border p-1 rounded"
                        value={form.projectTeamMember as string}
                        onChange={(e) => handleChange('projectTeamMember', e.target.value)}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      m.projectTeamMember
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(m.projectTeamJoinedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center space-x-2">
                    {editId === m.projectTeamId ? (
                      <>
                        <button
                          onClick={() => saveEdit(m.projectTeamId)}
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
                          onClick={() => removeMember(m.projectTeamId)}
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
                  팀원이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTeamTable;

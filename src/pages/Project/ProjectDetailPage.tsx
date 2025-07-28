import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/apiClient';
import type { Project } from '../../types/responseTypes';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api
      .get(`/api/v1/project/${id}`)
      .then((res) => setProject(res.data.result))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!project) return <div>프로젝트 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">프로젝트 상세 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">ID</label>
            <p className="text-lg text-gray-900">{project.projectId}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">제목</label>
            <p className="text-lg text-gray-900">{project.projectTitle}</p>
          </div>
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">내용</label>
            <p className="text-lg text-gray-900 whitespace-pre-wrap">{project.projectContent}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">작성일</label>
            <p className="text-lg text-gray-900">{new Date(project.projectCreatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;

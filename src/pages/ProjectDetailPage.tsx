import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../utils/api';
import type { Project } from '../types/responseTypes';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: project, isLoading, error } = useQuery<Project, Error>({
    queryKey: ['project', id],
    queryFn: () => fetcher(`/api/v1/project/${id}`),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!project) return <div>프로젝트 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">프로젝트 상세 정보</h2>
      <div>
        <p><strong>ID:</strong> {project.projectId}</p>
        <p><strong>제목:</strong> {project.projectTitle}</p>
        <p><strong>내용:</strong> {project.projectContent}</p>
        <p><strong>작성일:</strong> {new Date(project.projectCreatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProjectDetailPage;

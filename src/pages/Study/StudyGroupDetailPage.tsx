import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/apiClient';
import type { StudyGroup } from '../../types/responseTypes';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatDate';

const StudyGroupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [studyGroup, setStudyGroup] = useState<StudyGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStudyGroup = async () => {
      try {
        const response = await api.get(`/api/v1/study-group/${id}`);
        const studyData = response.data.result ?? response.data;
        setStudyGroup(studyData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyGroup();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('정말로 이 스터디 그룹을 삭제하시겠습니까?')) {
      try {
        await api.delete(`/api/v1/study-group/${id}`);
        alert('스터디 그룹이 삭제되었습니다.');
        navigate('/study');
      } catch (err) {
        setError(err as Error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 p-4">에러가 발생했습니다: {error.message}</div>;
  if (!studyGroup) return <div className="text-center p-4">스터디 그룹 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header Section */}
        <div className="border-b-2 border-gray-200 pb-4 mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 break-words mb-1">
            {studyGroup.studyGroupTitle}
          </h1>
          <div className="h-1 w-full bg-purple-500 rounded mb-4"></div>
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 mt-3 gap-x-4 gap-y-1">
            <span>
              작성자:{' '}
              <span className="font-medium text-gray-800">
                {studyGroup.studyGroupUserName
                  ? `${studyGroup.studyGroupUserName} (ID: ${studyGroup.studyGroupUserId})`
                  : studyGroup.studyGroupUserId || '정보 없음'}
              </span>
            </span>
            <span>
              작성일: <span className="font-medium text-gray-700">{formatDate(studyGroup.studyGroupCreatedAt)}</span>
            </span>
            {studyGroup.studyGroupUpdatedAt && studyGroup.studyGroupUpdatedAt !== studyGroup.studyGroupCreatedAt && (
              <span>
                수정일: <span className="font-medium text-gray-700">{formatDate(studyGroup.studyGroupUpdatedAt)}</span>
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div
          className="prose prose-lg max-w-none min-h-[50vh] bg-gray-50 rounded-lg p-4 sm:p-6 font-semibold"
          dangerouslySetInnerHTML={{ __html: studyGroup.studyGroupContent }}
        />

        {/* Button Section */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={() => navigate('/studies')}
            className="w-full sm:w-auto bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            목록으로
          </button>
          <button
            onClick={handleDelete}
            className="w-full sm:w-auto bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyGroupDetailPage;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNotice, updateNotice } from "../../utils/apiClient";
import type { Notice } from "../../types/responseTypes";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const NoticeEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        if (id) {
          const data = await getNotice(id);
          setNotice(data);
          setTitle(data.noticeTitle);
          setContent(data.noticeContent);
        }
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
    };
    fetchNotice();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateNotice(id, { noticeTitle: title, noticeContent: content });
        navigate(`/notices/${id}`);
      }
    } catch (error) {
      console.error("Error updating notice:", error);
    }
  };

  const handleCancel = () => {
    if (notice) {
      navigate(`/notices/${notice.noticeId}`);
    } else {
      navigate("/notices");
    }
  }

  if (!notice) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">공지사항 수정</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white mr-2 px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              수정
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeEditPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createNotice } from '../../utils/apiClient';

const NoticeCreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 30) {
      setTitle(e.target.value);
    }
  };

  const handleContentChange = (value: string) => {
    const text = value.replace(/<[^>]*>/g, '');
    if (text.length <= 3000) {
      setContent(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNotice({ noticeTitle: title, noticeContent: content });
      navigate('/notices');
    } catch (error) {
      console.error('Error creating notice:', error);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const getTextLength = (html: string) => {
    return html.replace(/<[^>]*>/g, '').length;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">공지사항 등록</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold text-gray-800">
              제목
            </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-bold text-gray-800">
            내용
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            modules={modules}
            className="mt-1 block w-full min-h-[30vh]"
            placeholder="공지사항 내용을 입력하세요."
          />
          <div className="text-right text-sm text-gray-500 mt-3">
            {getTextLength(content)}/3000
          </div>
        </div>
          <div className="flex justify-end mt-12">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeCreatePage;

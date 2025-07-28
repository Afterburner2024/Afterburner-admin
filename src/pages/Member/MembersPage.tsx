import React from "react";
import { Link } from "react-router-dom";
import { useDataFetching } from "../../hooks/useDataFetching";
import { usePagination } from "../../hooks/usePagination";
import SearchInput from "../../components/common/SearchInput";
import SortDropdown from "../../components/common/SortDropdown";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Pagination from "../../components/common/Pagination";
import type { Member } from "../../types/responseTypes";

// 정렬 옵션
const sortOptions = [
  { value: "userName-asc", label: "이름 (오름차순)" },
  { value: "userName-desc", label: "이름 (내림차순)" },
  { value: "registeredAt-asc", label: "가입일 (오래된 순)" },
  { value: "registeredAt-desc", label: "가입일 (최신 순)" },
];

const MembersPage: React.FC = () => {
  const {
    data: filteredAndSortedData,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
  } = useDataFetching<Member>({
    endpoint: "/api/v1/users",
    searchFields: ["userName", "userEmail"],
    queryKey: "members",
  });

  const { currentPage, totalPages, paginatedData, goToPage } = usePagination(
    filteredAndSortedData,
    5
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">회원 관리</h2>
        </div>
        <div className="my-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="w-full sm:w-auto">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="이름 또는 이메일로 검색"
            />
          </div>
          <div className="w-full sm:w-auto sm:text-right">
            <SortDropdown
              sortOption={sortOption}
              setSortOption={setSortOption}
              options={sortOptions}
            />
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    이름
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    가입일
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    상세 정보
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((member) => (
                    <tr key={member.userId} className="hover:bg-gray-50">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {member.userId}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {member.userName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {member.userEmail}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(member.registeredAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <Link
                          to={`/members/${member.userId}`}
                          className="text-indigo-600 hover:text-indigo-900 font-semibold"
                        >
                          보기
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-500">
                      회원이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {error && (
              <p className="mt-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-lg">
                데이터를 불러오는 데 실패했습니다.
              </p>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;

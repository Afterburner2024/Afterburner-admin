import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { app } from '../../utils/firebase';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import SearchInput from '../../components/common/SearchInput';
import SortDropdown from '../../components/common/SortDropdown';
import Pagination from '../../components/common/Pagination';
import { useSearchAndSort } from '../../hooks/useSearchAndSort';
import { usePagination } from '../../hooks/usePagination';
import { useAuthStore } from '../../store/authStore';
import { USER_STATUS } from '../../types/user';

const sortOptions = [
  { value: 'displayName-asc', label: '이름 (오름차순)' },
  { value: 'displayName-desc', label: '이름 (내림차순)' },
  { value: 'email-asc', label: '이메일 (오름차순)' },
  { value: 'email-desc', label: '이메일 (내림차순)' },
];

// 관리자 데이터 타입 정의
interface Admin {
  id: string;
  email?: string;
  displayName?: string;
  Status?: string;
}

const AdminsPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userStatus } = useAuthStore();

  const {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    filteredAndSortedData,
  } = useSearchAndSort<Admin>({
    initialData: admins,
    searchFields: ['displayName', 'email'],
  });

  const { currentPage, totalPages, paginatedData, goToPage } = usePagination(
    filteredAndSortedData,
    5
  );

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const db = getFirestore(app);
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const adminsList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Admin));
        setAdmins(adminsList);
      } catch (err) {
        setError('관리자 목록을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleRoleChange = async (adminId: string, newRole: string) => {
    if (userStatus !== USER_STATUS.SuperAdmin) return;
    try {
      const db = getFirestore(app);
      const adminRef = doc(db, 'users', adminId);
      await updateDoc(adminRef, { Status: newRole });

      setAdmins(admins.map(admin =>
        admin.id === adminId ? { ...admin, Status: newRole } : admin
      ));
    } catch (err) {
      console.error('권한 업데이트 실패:', err);
      alert('권한 업데이트에 실패했습니다.');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case USER_STATUS.SuperAdmin:
        return <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">최고관리자</span>;
      case USER_STATUS.ADMIN:
        return <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">관리자</span>;
      case USER_STATUS.PENDING:
        return <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">대기중</span>;
      case USER_STATUS.USER:
        return <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">유저</span>;
      default:
        return <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">알 수 없음</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight">관리자 관리</h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col justify-between">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="관리자 검색..."
          />
          <SortDropdown
            sortOption={sortOption}
            setSortOption={setSortOption}
            options={sortOptions}
          />
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    이름
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    권한
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{admin.displayName}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{admin.email}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        {userStatus === USER_STATUS.SuperAdmin ? (
                          <select
                            value={admin.Status}
                            onChange={(e) => handleRoleChange(admin.id, e.target.value)}
                            className="form-select appearance-none block w-full bg-white border border-gray-300 hover:border-gray-400 px-3 py-2 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                          >
                            <option value={USER_STATUS.SuperAdmin}>최고관리자</option>
                            <option value={USER_STATUS.ADMIN}>관리자</option>
                            <option value={USER_STATUS.PENDING}>대기중</option>
                            <option value={USER_STATUS.USER}>유저</option>
                          </select>
                        ) : (
                          getStatusBadge(admin.Status)
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-gray-500">
                      관리자가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {error && (
              <p className="mt-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminsPage;
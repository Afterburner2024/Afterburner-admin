import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { app } from '../../utils/firebase';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuthStore } from '../../store/authStore';
import { USER_STATUS } from '../../types/user';

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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">관리자 관리</h2>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">이름</th>
              <th className="py-3 px-6 text-left">이메일</th>
              <th className="py-3 px-6 text-center">권한</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{admin.displayName}</td>
                  <td className="py-3 px-6 text-left">{admin.email}</td>
                  <td className="py-3 px-6 text-center">
                    {userStatus === USER_STATUS.SuperAdmin ? (
                      <select
                        value={admin.Status}
                        onChange={(e) => handleRoleChange(admin.id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value={USER_STATUS.SuperAdmin}>최고관리자</option>
                        <option value={USER_STATUS.ADMIN}>관리자</option>
                        <option value={USER_STATUS.PENDING}>대기중</option>
                        <option value={USER_STATUS.USER}>유저</option>
                      </select>
                    ) : (
                      admin.Status
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-6 text-center">관리자가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AdminsPage;
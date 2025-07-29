import React from "react";

const ApprovalWaitingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#3C63EA] to-[#FFFFFF]">
      <div className="w-[60%] h-[50vh] max-w-md p-10 bg-[#FFFFFF]/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/10 flex flex-col justify-center text-center fade-in">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-20 mx-auto"
          />
        <h1 className="text-3xl font-extrabold text-violet-800 mb-4">
          사용자 승인 대기중입니다
        </h1>
        <p className="text-lg text-[#000000]">
          관리자의 승인이 완료되면 자동으로 이동됩니다.
        </p>
      </div>
    </div>
  );
};

export default ApprovalWaitingPage;

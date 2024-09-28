"use client";
import React from "react";

interface AccountType {
  Account_number: string;
  Account_Holder: string;
  UserID: string;
}

interface AccountProps {
  account: AccountType;
}

const CreditCard: React.FC<AccountProps> = React.memo(({ account }) => {
  return (
    <div className="relative w-80 h-48 p-4 bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl shadow-2xl text-white overflow-hidden">
      {/* Shiny background layer */}
      <div className="absolute inset-0">
        <div className="shiny"></div>
      </div>

      {/* Blurred gradient circles */}
      <div className="absolute inset-0 opacity-20">
        <div className="blurred-circle -top-20 -right-16"></div>
        <div className="blurred-circle -bottom-20 -left-16"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100 opacity-10 rounded-xl"></div>

      {/* Card Content */}
      <div className="relative z-10">
        <div className="text-lg font-semibold">{account.Account_Holder}</div>
        <div className="text-sm tracking-widest mt-2">
          **** **** **** {account.Account_number.slice(-4)}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div>
            <div className="text-sm">@{account.UserID}</div>
          </div>
          <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-md">
            <span className="font-bold text-lg">PayMe</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreditCard;
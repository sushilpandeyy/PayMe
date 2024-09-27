import React from 'react';
import { CheckCircleIcon, LucideXCircle } from 'lucide-react';
type Status = 'loading' | 'success' | 'error';

interface PaymentStatusProps {
  status: Status;
}

export default function PaymentStatus({ status }: PaymentStatusProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      {status === 'loading' && (
        <div className="flex flex-col items-center space-y-4">
          {/* Stylish Loading Spinner */}
          <div className="w-16 h-16 border-4 border-gray-300 border-t-primary-button-bg rounded-full animate-spin"></div>
          <p className="text-primary-text">Processing Payment...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center space-y-4">
          {/* Success Green Icon */}
          <CheckCircleIcon className="w-16 h-16 text-green-500" />
          <p className="text-primary-text">Payment Successful!</p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center space-y-4">
          {/* Failed Red Icon */}
          <LucideXCircle className="w-16 h-16 text-red-500" />
          <p className="text-primary-text">Payment Failed!</p>
        </div>
      )}
    </div>
  );
}
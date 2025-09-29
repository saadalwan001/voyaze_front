import React from 'react';
import { X, CreditCard, Banknote, Download, Lock } from 'lucide-react';

const PaymentMethodPopup = ({ isOpen, onClose, onCashPayment, onCardPayment }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      {/* Blur Background */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Payment Method Popup */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Select Payment Method</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Payment Options */}
        <div className="p-6 space-y-4">
          {/* Cash Payment Option */}
          <button
            onClick={onCashPayment}
            className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200">
                <Banknote className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-800">Cash Payment</h3>
                <p className="text-sm text-gray-600">Pay in cash and get instant invoice</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <Download className="w-3 h-3 mr-1" />
                  <span>PDF Invoice Download</span>
                </div>
              </div>
            </div>
          </button>

          {/* Card Payment Option */}
          <button
            onClick={onCardPayment}
            className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-800">Card Payment</h3>
                <p className="text-sm text-gray-600">Pay securely with your bank card</p>
                <div className="flex items-center mt-1 text-xs text-blue-600">
                  <Lock className="w-3 h-3 mr-1" />
                  <span>Secure Payment Gateway</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-gray-500 text-center">
            All transactions are secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodPopup;
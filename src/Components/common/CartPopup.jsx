import React, { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingCart, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import PaymentMethodPopup from "./PaymentMethodPopup";
import BankPaymentPopup from "./BankPaymentPopup";

// PDF Generator Function - you can also import this from utils/pdfGenerator.js
const generateInvoiceHTML2PDF = (cartItems, cartTotal) => {
  const invoiceNumber = "INV-" + Date.now().toString().slice(-8);
  const currentDate = new Date().toLocaleDateString();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin: 0;">TOUR BOOKING INVOICE</h1>
        <p style="margin: 5px 0; color: #666;">Professional Travel Services</p>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div>
          <h3 style="color: #374151; margin-bottom: 10px;">Invoice Details</h3>
          <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
          <p><strong>Date:</strong> ${currentDate}</p>
          <p><strong>Payment Method:</strong> Cash Payment</p>
        </div>
        <div style="text-align: right;">
          <h3 style="color: #374151; margin-bottom: 10px;">Company Details</h3>
          <p>Tour Company Ltd.</p>
          <p>123 Travel Street</p>
          <p>Tourism City, TC 12345</p>
          <p>Phone: +1 234 567 8900</p>
        </div>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left;">Package</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Duration</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Adults</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">Children</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">Unit Price</th>
            <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${cartItems
            .map((item) => {
              const itemTotal =
                item.adult_single_price * item.adults +
                item.child_single_price * item.children;
              return `
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 12px;">
                  <strong>${item.title}</strong>
                  <br>
                  <small>Adults: $${item.adult_single_price} × ${
                item.adults
              } = $${(item.adult_single_price * item.adults).toFixed(2)}</small>
                  ${
                    item.children > 0
                      ? `<br><small>Children: $${item.child_single_price} × ${
                          item.children
                        } = $${(
                          item.child_single_price * item.children
                        ).toFixed(2)}</small>`
                      : ""
                  }
                </td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${
                  item.total_days
                } Days</td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${
                  item.adults
                }</td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center;">${
                  item.children
                }</td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right;">$${
                  item.adult_single_price
                }</td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-weight: bold;">$${itemTotal.toFixed(
                  2
                )}</td>
              </tr>
            `;
            })
            .join("")}
        </tbody>
      </table>
      
      <div style="text-align: right; margin-bottom: 30px;">
        <div style="display: inline-block; text-align: left;">
          <p><strong>Subtotal: $${cartTotal.toFixed(2)}</strong></p>
          <p>Tax (10%): $${(cartTotal * 0.1).toFixed(2)}</p>
          <p style="font-size: 18px; color: #2563eb;"><strong>TOTAL: $${(
            cartTotal * 1.1
          ).toFixed(2)}</strong></p>
        </div>
      </div>
      
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 30px;">
        <h3 style="color: #374151; margin-top: 0;">Payment Terms & Conditions</h3>
        <ul style="color: #6b7280;">
          <li>Payment is due in full before tour commencement</li>
          <li>Cancellation must be made 48 hours in advance for full refund</li>
          <li>Please bring this invoice and valid ID on tour day</li>
          <li>Emergency contact: +1 234 567 8900</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin-top: 40px; color: #9ca3af; font-size: 12px;">
        <p>Thank you for choosing our tour services!</p>
        <p>For inquiries, please contact us at info@tourcompany.com</p>
      </div>
    </div>
  `;

  // Create a new window and print
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice ${invoiceNumber}</title>
        <style>
          body { margin: 0; padding: 20px; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        ${htmlContent}
        <div class="no-print" style="text-align: center; margin-top: 30px;">
          <button onclick="window.print()" style="background: #2563eb; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-right: 10px;">Print Invoice</button>
          <button onclick="window.close()" style="background: #6b7280; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">Close</button>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();

  return invoiceNumber;
};

const CartPopup = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    getCartAge,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    isInitialized,
  } = useCart();

  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [showBankPayment, setBankPayment] = useState(false);

  if (!isCartOpen || !isInitialized) return null;

  const cartAge = getCartAge();
  const daysRemaining = Math.max(0, 7 - cartAge);
  const cartTotal = getCartTotal();

  const handleProceedToBooking = () => {
    setShowPaymentMethod(true);
  };

  const handleCashPayment = () => {
    setShowPaymentMethod(false);

    try {
      // Generate PDF Invoice
      const invoiceNumber = generateInvoiceHTML2PDF(cartItems, cartTotal);

      // Show success message
      alert(`Invoice generated successfully! Invoice Number: ${invoiceNumber}`);

      // Optionally clear cart after successful cash payment
      // clearCart();
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Error generating invoice. Please try again.");
    }
  };

  const handleCardPayment = () => {
    setShowPaymentMethod(false);
    setBankPayment(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />

        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold">Tour Cart</h2>
                {cartItems.length > 0 && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Expires in {daysRemaining} days</span>
                  </div>
                )}
              </div>
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                {getCartCount()} travelers
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-96">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-2">
                  Items added to cart will be saved for 7 days
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={`${
                          import.meta.env.VITE_API_URL?.replace("/api", "") ||
                          ""
                        }${item.main_image}`}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.total_days} Days
                        </p>

                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Adults:</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(0, item.adults - 1),
                                    item.children
                                  )
                                }
                                className="p-1 rounded-full hover:bg-gray-100"
                                disabled={item.adults <= 0}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center">
                                {item.adults}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.adults + 1,
                                    item.children
                                  )
                                }
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm">Children:</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.adults,
                                    Math.max(0, item.children - 1)
                                  )
                                }
                                className="p-1 rounded-full hover:bg-gray-100"
                                disabled={item.children <= 0}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center">
                                {item.children}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.adults,
                                    item.children + 1
                                  )
                                }
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-blue-600">
                          $
                          {(
                            (item.adult_single_price || 0) * item.adults +
                            (item.child_single_price || 0) * item.children
                          ).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2 p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleProceedToBooking}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Proceed to Booking
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-2">
                Cart will be automatically cleared after 7 days
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Method Selection Popup */}
      <PaymentMethodPopup
        isOpen={showPaymentMethod}
        onClose={() => setShowPaymentMethod(false)}
        onCashPayment={handleCashPayment}
        onCardPayment={handleCardPayment}
      />

      {/* Bank Payment Popup */}
      <BankPaymentPopup
        isOpen={showBankPayment}
        onClose={() => setBankPayment(false)}
        cartTotal={cartTotal}
      />
    </>
  );
};

export default CartPopup;

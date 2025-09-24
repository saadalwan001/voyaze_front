import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart, Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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
    isInitialized
  } = useCart();

  if (!isCartOpen || !isInitialized) return null;

  const cartAge = getCartAge();
  const daysRemaining = Math.max(0, 7 - cartAge);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur Background */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Popup */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
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

        {/* Cart Items */}
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
                      src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${item.main_image}`}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.total_days} Days</p>
                      
                      <div className="mt-3 space-y-2">
                        {/* Adults Counter */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Adults:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, item.adults - 1), item.children)}
                              className="p-1 rounded-full hover:bg-gray-100"
                              disabled={item.adults <= 0}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.adults}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.adults + 1, item.children)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Children Counter */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Children:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.adults, Math.max(0, item.children - 1))}
                              className="p-1 rounded-full hover:bg-gray-100"
                              disabled={item.children <= 0}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.children}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.adults, item.children + 1)}
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
                        ${((item.adult_single_price || 0) * item.adults + (item.child_single_price || 0) * item.children).toFixed(2)}
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

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-blue-600">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={clearCart}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Clear Cart
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
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
  );
};

export default CartPopup;
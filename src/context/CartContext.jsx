import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cart storage key
  const CART_STORAGE_KEY = 'tourCart';
  
  // 7 days in milliseconds
  const CART_EXPIRY_DAYS = 7;
  const CART_EXPIRY_MS = CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

  // Load cart from localStorage on mount with expiry check
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          
          // Check if cart has expired
          if (cartData.timestamp && Date.now() - cartData.timestamp < CART_EXPIRY_MS) {
            setCartItems(cartData.items || []);
          } else {
            // Cart expired, clear it
            localStorage.removeItem(CART_STORAGE_KEY);
            setCartItems([]);
          }
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // If there's an error parsing, clear the corrupted cart
        localStorage.removeItem(CART_STORAGE_KEY);
        setCartItems([]);
      } finally {
        setIsInitialized(true);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;

    const saveCart = () => {
      try {
        const cartData = {
          items: cartItems,
          timestamp: Date.now(),
          expiry: CART_EXPIRY_MS
        };
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    };

    saveCart();
  }, [cartItems, isInitialized]);

  // Function to check and clear expired cart (optional cleanup)
  const checkCartExpiry = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        if (cartData.timestamp && Date.now() - cartData.timestamp >= CART_EXPIRY_MS) {
          localStorage.removeItem(CART_STORAGE_KEY);
          setCartItems([]);
          return true;
        }
      }
    } catch (error) {
      console.error('Error checking cart expiry:', error);
    }
    return false;
  };

  const addToCart = (tourPackage, adults = 1, children = 0) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === tourPackage.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === tourPackage.id
            ? { 
                ...item, 
                adults: item.adults + adults,
                children: item.children + children,
                updatedAt: new Date().toISOString()
              }
            : item
        );
      }
      
      return [...prev, {
        id: tourPackage.id,
        title: tourPackage.title,
        main_image: tourPackage.main_image,
        total_days: tourPackage.total_days,
        adult_single_price: tourPackage.adult_single_price,
        child_single_price: tourPackage.child_single_price,
        adults,
        children,
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }];
    });
  };

  const removeFromCart = (packageId) => {
    setCartItems(prev => prev.filter(item => item.id !== packageId));
  };

  const updateQuantity = (packageId, adults, children) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === packageId ? { 
          ...item, 
          adults: Math.max(0, adults),
          children: Math.max(0, children),
          updatedAt: new Date().toISOString()
        } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // Clear expired cart manually if needed
  const clearExpiredCart = () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const adultPrice = (item.adult_single_price || 0) * item.adults;
      const childPrice = (item.child_single_price || 0) * item.children;
      return total + adultPrice + childPrice;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.adults + item.children, 0);
  };

  const getItemCount = () => {
    return cartItems.length;
  };

  const getCartAge = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        if (cartData.timestamp) {
          const ageInMs = Date.now() - cartData.timestamp;
          const ageInDays = Math.floor(ageInMs / (24 * 60 * 60 * 1000));
          return ageInDays;
        }
      }
    } catch (error) {
      console.error('Error getting cart age:', error);
    }
    return 0;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    clearExpiredCart,
    getCartTotal,
    getCartCount,
    getItemCount,
    getCartAge,
    isCartOpen,
    setIsCartOpen,
    isInitialized,
    checkCartExpiry
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
import { AiOutlineShoppingCart, AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import styles from './CartMenu.module.css'; // Changed the import to .css

import { useCallback, useEffect, useRef, useState } from 'react';
import CartList from './CartList';
import { useCart } from '../../hooks/useCart';

export default function CartMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orderType, setOrderType] = useState('delivery');
  const { cart, orderNumber } = useCart();

  const refOne = useRef(null); // Removed TypeScript type annotation
  useEffect(() => {
    const handleCloseCart = (event) => {
      if (!refOne.current.contains(event.target)) {
        setIsSidebarOpen(false);
      } else {
        return;
      }
    };
    document.addEventListener('click', handleCloseCart, true);
    return () => document.removeEventListener('click', handleCloseCart, true); // Cleanup to avoid memory leaks
  }, []);

  const handleOrderType = useCallback((order) => {
    setOrderType(order);
  }, []);

  return (
    <aside className={`${styles.menuContainer} ${isSidebarOpen ? styles.cartMenuOpen : ''}`} ref={refOne}>
      <div>
        <div className={styles.header}>
          <a
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? undefined : cart.length ? String(cart.length) : undefined}
            className={`${styles.cart} ${!isSidebarOpen && styles.cartClosed}`}
          >
            <AiOutlineDoubleLeft size={15} className={styles.arrowLeft} />
            <AiOutlineShoppingCart size={25} className={styles.shopCart} />
            <AiOutlineDoubleRight size={15} className={styles.arrowRight} />
          </a>

          <h3>
            Order #<span>{orderNumber}</span>
          </h3>
        </div>

        <div className={styles.orderType}>
          <span
            className={orderType === 'delivery' ? styles.orderTypeSelected : ''}
            onClick={() => handleOrderType('delivery')}
          >
            delivery
          </span>
          <span
            className={orderType === 'togo' ? styles.orderTypeSelected : ''}
            onClick={() => handleOrderType('togo')}
          >
            to go
          </span>
        </div>

        <CartList isSidebarOpen={isSidebarOpen} />
      </div>
    </aside>
  );
}

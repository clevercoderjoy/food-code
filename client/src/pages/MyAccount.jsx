import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from '../slice/OrderSlice';
import { selectCurrentUser } from "../slice/UserSlice";
import { toast } from 'react-toastify';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import app from '../firebase/config';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

const MyAccount = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [userOrders, setUserOrders] = useState([]);

  const isAdmin = currentUser && currentUser.role === 'admin';

  const sortOrdersByStatus = (orders) => {
    const statusPriority = {
      placed: 1,
      confirmed: 2,
      'out for delivery': 3,
      delivered: 4,
    };

    return orders.sort((a, b) => {
      const statusA = statusPriority[a.status];
      const statusB = statusPriority[b.status];
      return statusA - statusB;
    });
  };

  useEffect(() => {
    const fetchOrders = () => {
      const ordersRef = collection(db, 'orders');
      let q;

      if (isAdmin) {
        q = query(ordersRef);
      } else if (currentUser?.uid) {
        q = query(ordersRef, where('userId', '==', currentUser.uid));
      } else {
        console.error("User ID is undefined. Cannot fetch orders.");
        return;
      }

      const subscribe = onSnapshot(q, (querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({ id: doc.id, ...doc.data() });
        });

        const sortedOrders = sortOrdersByStatus(orders);
        setUserOrders(sortedOrders);
      });
      return () => subscribe();
    };

    fetchOrders();
  }, [currentUser, isAdmin]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error('Failed to update order status: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">My Account</h1>
      <div className="mb-6">
        <h2 className="text-xl">User Details</h2>
        <p><strong>Email:</strong> {currentUser?.email}</p>
        <p><strong>User ID:</strong> {currentUser?.uid}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl">Orders</h2>
        {userOrders.length > 0 ? (
          <ul className="mt-2">
            {userOrders.map((order) => (
              <li key={order.id} className="border p-2 mb-2">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Status:</strong> {order.status}</p>

                {isAdmin && (
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                    className="mt-2"
                  >
                    <option value="placed">Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;

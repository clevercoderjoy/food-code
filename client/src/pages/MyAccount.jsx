import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from '../slice/OrderSlice';
import { selectCurrentUser } from "../slice/UserSlice";
import { toast } from 'react-toastify';
import { collection, onSnapshot, query, where, deleteDoc, doc } from 'firebase/firestore';
import app from '../firebase/config';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

const MyAccount = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [userOrders, setUserOrders] = useState([]);
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    if (!isAdmin) return;

    const fetchUsers = () => {
      const usersRef = collection(db, 'users');
      const subscribe = onSnapshot(usersRef, (querySnapshot) => {
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
      });
      return () => subscribe();
    };

    fetchUsers();
  }, [isAdmin]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error('Failed to update order status: ' + error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (userId === currentUser?.uid) {
      toast.error('You cannot delete your own account.');
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'users', userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user: ' + error.message);
    }
  };

  return (
    <div className={`p-4 ${!isAdmin ? 'flex flex-col items-center' : ''}`}>
      <h1 className="text-4xl font-bold mb-4 text-center">My Account</h1>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">{currentUser && currentUser.role === "admin" ? "Admin" : "User"} Details</h2>
        <p className="text-center"><strong>Email:</strong> {currentUser?.email}</p>
        <p className="text-center"><strong>User ID:</strong> {currentUser?.uid}</p>
      </div>

      <div className={`grid ${isAdmin ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-center">Orders</h2>
          {userOrders.length > 0 ? (
            <ul className="space-y-4">
              {userOrders.map((order) => (
                <li key={order.id} className="border rounded-lg p-4 shadow-sm">
                  <p className="text-left"><strong>Order ID:</strong> {order.id}</p>
                  <p className="text-left font-bold"><strong>Status:</strong> {order.status}</p>

                  {isAdmin && (
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="mt-2 w-full p-2 border rounded"
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

        {isAdmin && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Users</h2>
            {users.length > 0 ? (
              <ul className="space-y-4">
                {users.map((user) => (
                  <li key={user.id} className="border rounded-lg p-4 shadow-sm flex justify-between items-center">
                    <div className="text-left">
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>User ID:</strong> {user.uid}</p>
                      <p><strong>Role:</strong> <strong>{user.role}</strong></p>
                    </div>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="ml-4 bg-red-500 text-white rounded px-2 py-1"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    tickets: 0,
  });

  const [tickets, setTickets] = useState([]);
  const markResolved = async (id) => {
    try {
      await updateDoc(doc(db, "supportRequests", id), {
        status: "resolved",
      });

      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersData = usersSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) =>
          (a.displayName || "").localeCompare(b.displayName || ""),
        );

      setUsers(usersData);
      const q = query(
        collection(db, "supportRequests"),
        orderBy("createdAt", "desc"),
      );

      const ticketsSnapshot = await getDocs(q);
      setStats({
        users: usersSnapshot.size,
        tickets: ticketsSnapshot.size,
      });

      const ticketData = ticketsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTickets(ticketData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage Finexa platform activity</p>
      </div>

      <div className="admin-stats">
        <div
          className="admin-card clickable"
          onClick={() => setShowUsersModal(true)}
        >
          {" "}
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="admin-card">
          <h3>Support Tickets</h3>
          <p>{stats.tickets}</p>
        </div>
      </div>

      <div className="admin-section">
        <h2>Recent Support Requests</h2>

        {tickets.length === 0 ? (
          <div className="empty-admin">No support tickets yet.</div>
        ) : (
          tickets.map((ticket) => (
            <div className="ticket-card" key={ticket.id}>
              <div className="ticket-top">
                <h3>{ticket.subject}</h3>
                <div className="ticket-badges">
                  <span className="ticket-category">{ticket.category}</span>

                  <span className={`ticket-status ${ticket.status}`}>
                    {ticket.status}
                  </span>
                </div>{" "}
              </div>

              <p>{ticket.message}</p>

              <div className="ticket-meta">
                <span>{ticket.name}</span>
                <span>{ticket.email}</span>
              </div>

              {ticket.status !== "resolved" && (
                <button
                  className="resolve-btn"
                  onClick={() => markResolved(ticket.id)}
                >
                  Mark Resolved
                </button>
              )}
            </div>
          ))
        )}
      </div>
      {showUsersModal && (
        <div className="modal-overlay" onClick={() => setShowUsersModal(false)}>
          <div className="users-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>👥 Registered Users</h2>

              <button
                className="close-btn"
                onClick={() => setShowUsersModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="users-list">
              {users.map((user) => (
                <div className="user-row" key={user.id}>
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="user-avatar"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.displayName || "User",
                      )}&background=6366f1&color=fff`;
                    }}
                  />

                  <div>
                    <h4>{user.displayName}</h4>
                    <p>{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

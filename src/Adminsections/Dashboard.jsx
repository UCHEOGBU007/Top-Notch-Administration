// import React, { useEffect, useState, useMemo } from "react";
// import Styles from "../Css/Dashboard.module.css";
// import supabase from "../Config/Supabase.jsx";

// // Using self-contained SVG components for confirmed status
// const CheckCircleIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="32"
//     height="32"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//     <polyline points="22 4 12 14.01 9 11.01"></polyline>
//   </svg>
// );

// // Using self-contained SVG components for pending status
// const ClockIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="32"
//     height="32"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <circle cx="12" cy="12" r="10"></circle>
//     <polyline points="12 6 12 12 16 14"></polyline>
//   </svg>
// );

// const Dashboard = () => {
//   const [reservations, setReservations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [counts, setCounts] = useState({ confirmed: 0, pending: 0 });

//   useEffect(() => {
//     fetchReservations();
//   }, []);

//   // Update counts only when the reservations list changes
//   useEffect(() => {
//     const confirmed = reservations.filter(
//       (res) => res.status === "confirmed"
//     ).length;
//     const pending = reservations.length - confirmed;
//     setCounts({ confirmed, pending });
//   }, [reservations]);

//   const fetchReservations = async () => {
//     const { data, error } = await supabase
//       .from("top_notch_reservations")
//       .select("*");

//     if (error) {
//       console.error("Error fetching reservations:", error);
//     } else {
//       setReservations(data);
//     }
//   };

//   const handleConfirm = async (id) => {
//     // Optimistic UI update
//     setReservations((prev) =>
//       prev.map((res) => (res.id === id ? { ...res, status: "confirmed" } : res))
//     );

//     const { error } = await supabase
//       .from("top_notch_reservations")
//       .update({ status: "confirmed" })
//       .eq("id", id);

//     if (error) {
//       console.error("Error confirming reservation:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this reservation?")) {
//       const { error } = await supabase
//         .from("top_notch_reservations")
//         .delete()
//         .eq("id", id);

//       if (error) {
//         console.error("Error deleting reservation:", error);
//         alert("Failed to delete reservation. Please try again.");
//       } else {
//         // Only update UI after successful deletion
//         fetchReservations(); // Refresh from backend
//       }
//     }
//   };

//   // Use useMemo to cache the filtering result. Recalculates only if reservations or searchTerm changes.
//   const filteredReservations = useMemo(() => {
//     return reservations.filter((res) =>
//       res.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [reservations, searchTerm]);

//   return (
//     <section className={Styles.reservationSection}>
//       <main className={Styles.dashboardMain}>
//         <section className={Styles.dashboardHeader}>
//           <h2>Manage Reservations</h2>
//           <p>View and manage all reservations here.</p>
//         </section>

//         <div className={Styles.statsContainer}>
//           <article
//             className={`${Styles.statCard} ${Styles.confirmedCardBorder}`}
//             style={{ borderLeft: "#10b981 100px solid" }}
//           >
//             <div className={Styles.statContent}>
//               <h3>Completed Reservations</h3>
//               <div className={`${Styles.iconWrapper} ${Styles.confirmedIcon}`}>
//                 <CheckCircleIcon />
//                 <p style={{ border: "none" }}>{counts.confirmed}</p>
//               </div>
//             </div>
//           </article>

//           <article
//             className={`${Styles.statCard} ${Styles.pendingCardBorder}`}
//             style={{ borderLeft: "#fbbf24 100px solid" }}
//           >
//             <div>
//               <h3>Pending Reservations</h3>
//               <div className={`${Styles.iconWrapper} ${Styles.pendingIcon}`}>
//                 <ClockIcon />
//                 <p style={{ border: "none" }}>{counts.pending}</p>
//               </div>
//             </div>
//           </article>
//         </div>
//       </main>

//       <div className={`${Styles.reservationStatistics}`}>
//         <h2>Search Reservations</h2>
//         <form
//           className={Styles.searchForm}
//           onSubmit={(e) => {
//             e.preventDefault();
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Search by name..."
//             className={Styles.searchInput}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit" className={Styles.searchButton}>
//             Search
//           </button>
//         </form>
//       </div>

//       <div className={Styles.tableWrapper}>
//         <table className={Styles.reservationTable}>
//           <thead className={Styles.tableHeader}>
//             <tr className={Styles.tableRow}>
//               <th>Name</th>
//               <th>Time</th>
//               <th>Email</th>
//               <th>Date</th>
//               <th>Telephone</th>
//               <th>Guest</th>
//               <th>Services</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody className={Styles.tableBody}>
//             {filteredReservations.map((res) => (
//               <tr key={res.id} className={Styles.tableRow}>
//                 <td>{res.name}</td>
//                 <td>{res.time}</td>
//                 <td>{res.email}</td>
//                 <td>{res.date}</td>
//                 <td>{res.phone || "N/A"}</td>
//                 <td>{res.guests}</td>
//                 <td>{res.occasion}</td>
//                 {/* Status text coloring uses dedicated CSS classes */}
//                 <td
//                   className={
//                     res.status === "confirmed"
//                       ? Styles.confirmedStatusText
//                       : Styles.pendingStatusText
//                   }
//                 >
//                   {res.status || "unconfirmed"}
//                 </td>
//                 <td>
//                   <div className={Styles.actionButtons}>
//                     <button
//                       onClick={() => handleConfirm(res.id)}
//                       disabled={res.status === "confirmed"}
//                       className={
//                         res.status === "confirmed"
//                           ? `${Styles.confirmButton} ${Styles.confirmConfirmed}`
//                           : `${Styles.confirmButton} ${Styles.confirmPending}`
//                       }
//                     >
//                       {res.status === "confirmed" ? "Confirmed" : "Confirm"}
//                     </button>
//                     <button
//                       onClick={() => handleDelete(res.id)}
//                       className={`${Styles.deleteButton}`}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState, useMemo } from "react";
import Styles from "../Css/Dashboard.module.css";
import supabase from "../Config/Supabase.jsx";

const CheckCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ClockIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [counts, setCounts] = useState({ confirmed: 0, pending: 0 });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const { data, error } = await supabase
        .from("top_notch_reservations")
        .select("*");
      if (error) {
        console.error("Error fetching reservations:", error);
        setErrorMsg("Failed to load reservations.");
        setReservations([]);
        setCounts({ confirmed: 0, pending: 0 });
      } else {
        const list = Array.isArray(data) ? data : [];
        setReservations(list);
        const confirmed = list.filter((r) => r.status === "confirmed").length;
        const pending = list.length - confirmed;
        setCounts({ confirmed, pending });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMsg("Unexpected error occurred.");
      setReservations([]);
      setCounts({ confirmed: 0, pending: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    if (!id) return;
    setActionLoading((s) => ({ ...s, [id]: true }));
    try {
      const { data, error } = await supabase
        .from("top_notch_reservations")
        .update({ status: "confirmed" })
        .eq("id", id)
        .select();
      if (error) {
        console.error("Supabase update error (confirm):", error);
        alert("Unable to confirm reservation. Check console for details.");
      } else if (data && data.length > 0) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...data[0] } : r))
        );
        // refresh authoritative state
        await fetchReservations();
      } else {
        await fetchReservations();
      }
    } catch (err) {
      console.error("Unexpected error confirming reservation:", err);
      alert("Unexpected error. See console.");
    } finally {
      setActionLoading((s) => ({ ...s, [id]: false }));
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    const target = reservations.find((r) => r.id === id);
    if (!target) return;
    if (target.status === "confirmed") {
      alert("Confirmed reservations cannot be deleted.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this reservation?"))
      return;
    setActionLoading((s) => ({ ...s, [id]: true }));
    try {
      const { error } = await supabase
        .from("top_notch_reservations")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Error deleting reservation:", error);
        alert("Failed to delete reservation. Please try again.");
      } else {
        setReservations((prev) => prev.filter((r) => r.id !== id));
        setCounts((prev) => {
          const wasConfirmed = target.status === "confirmed";
          const confirmed = wasConfirmed
            ? Math.max(0, prev.confirmed - 1)
            : prev.confirmed;
          const pending = Math.max(0, reservations.length - 1 - confirmed);
          return { confirmed, pending };
        });
      }
    } catch (err) {
      console.error("Unexpected error deleting reservation:", err);
      alert("Unexpected error. See console.");
    } finally {
      setActionLoading((s) => ({ ...s, [id]: false }));
    }
  };

  const filteredReservations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return reservations;
    return reservations.filter((res) =>
      (res.name || "").toLowerCase().includes(term)
    );
  }, [reservations, searchTerm]);

  return (
    <section className={Styles.reservationSection}>
      <main className={Styles.dashboardMain}>
        <section className={Styles.dashboardHeader}>
          <h2>Manage Reservations</h2>
          <p>View and manage all reservations here.</p>
        </section>

        <div className={Styles.statsContainer}>
          <article
            className={`${Styles.statCard} ${Styles.confirmedCardBorder}`}
            style={{ borderLeft: "#10b981 100px solid" }}
          >
            <div className={Styles.statContent}>
              <h3>Completed Reservations</h3>
              <div className={`${Styles.iconWrapper} ${Styles.confirmedIcon}`}>
                <CheckCircleIcon />
                <p style={{ border: "none" }}>{counts.confirmed}</p>
              </div>
            </div>
          </article>

          <article
            className={`${Styles.statCard} ${Styles.pendingCardBorder}`}
            style={{ borderLeft: "#fbbf24 100px solid" }}
          >
            <div>
              <h3>Pending Reservations</h3>
              <div className={`${Styles.iconWrapper} ${Styles.pendingIcon}`}>
                <ClockIcon />
                <p style={{ border: "none" }}>{counts.pending}</p>
              </div>
            </div>
          </article>
        </div>
      </main>

      <div className={Styles.reservationStatistics}>
        <h2>Search Reservations</h2>
        <form
          className={Styles.searchForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search by name..."
            className={Styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className={Styles.searchButton}>
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <p className={Styles.loadingText}>Loading reservations...</p>
      ) : errorMsg ? (
        <p className={Styles.errorText}>{errorMsg}</p>
      ) : (
        <div className={Styles.tableWrapper}>
          <table className={Styles.reservationTable}>
            <thead className={Styles.tableHeader}>
              <tr className={Styles.tableRow}>
                <th>Name</th>
                <th>Time</th>
                <th>Email</th>
                <th>Date</th>
                <th>Telephone</th>
                <th>Guest</th>
                <th>Services</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={Styles.tableBody}>
              {filteredReservations.map((res) => (
                <tr key={res.id} className={Styles.tableRow}>
                  <td>{res.name}</td>
                  <td>{res.time}</td>
                  <td>{res.email}</td>
                  <td>{res.date}</td>
                  <td>{res.phone || "N/A"}</td>
                  <td>{res.guests}</td>
                  <td>{res.occasion}</td>
                  <td
                    className={
                      res.status === "confirmed"
                        ? Styles.confirmedStatusText
                        : Styles.pendingStatusText
                    }
                  >
                    {res.status || "unconfirmed"}
                  </td>
                  <td>
                    <div className={Styles.actionButtons}>
                      <button
                        onClick={() => handleConfirm(res.id)}
                        disabled={
                          res.status === "confirmed" || !!actionLoading[res.id]
                        }
                        className={
                          res.status === "confirmed"
                            ? `${Styles.confirmButton} ${Styles.confirmConfirmed}`
                            : `${Styles.confirmButton} ${Styles.confirmPending}`
                        }
                      >
                        {actionLoading[res.id]
                          ? "Processing..."
                          : res.status === "confirmed"
                          ? "Confirmed"
                          : "Confirm"}
                      </button>
                      <button
                        onClick={() => handleDelete(res.id)}
                        disabled={
                          res.status === "confirmed" || !!actionLoading[res.id]
                        }
                        className={Styles.deleteButton}
                      >
                        {actionLoading[res.id]
                          ? "Processing..."
                          : res.status === "confirmed"
                          ? "Locked"
                          : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReservations.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Dashboard;

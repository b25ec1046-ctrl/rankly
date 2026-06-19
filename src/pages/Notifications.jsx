// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";

// function Notifications() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) return;

//     const { data } = await supabase
//       .from("notifications")
//       .select("*")
//       .eq("user_id", user.id)
//       .order("created_at", { ascending: false });

//     setNotifications(data || []);
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "700px",
//         margin: "20px auto",
//         padding: "20px",
//       }}
//     >
//       <h2>🔔 Notifications</h2>

//       {notifications.length === 0 ? (
//         <p>Coming Soon 🚀</p>
//       ) : (
//         notifications.map((n) => (
//           <div
//             key={n.id}
//             style={{
//               background: "#1e293b",
//               color: "#fff",
//               padding: "15px",
//               marginTop: "10px",
//               borderRadius: "12px",
//             }}
//           >
//             {n.message}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Notifications;
function Notifications() {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>🔔 Notifications</h2>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h3>🚀 Coming Soon</h3>

        <p>Notification system is currently under development.</p>
      </div>
    </div>
  );
}

export default Notifications;

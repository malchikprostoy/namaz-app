import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Typography } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
          console.error("No token found");
          return;
        }
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <Alert severity="info">Loading...</Alert>;

  return (
    <div>
      <Typography>Name: {user.name}</Typography>
    </div>
  );
};

export default Profile;

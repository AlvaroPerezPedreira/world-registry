import React from "react";
import Map from "../components/Map";
import Navbar from "../components/Navbar";

export default function Home({ user }) {
  const email = user?.email;

  return (
    <div>
      {email === "admin@app.com" ? <Navbar /> : <></>}
      <Map />
    </div>
  );
}

import Map from "../../components/map/Map";
import Navbar from "../../components/navbar/Navbar";

export default function Home({ user }) {
  const email = user?.email;

  return (
    <div>
      {email === "admin@app.com" ? <Navbar /> : <></>}
      <Map />
    </div>
  );
}

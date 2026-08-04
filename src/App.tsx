import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import HowItWorks from "./pages/HowItWorks";
import Platform from "./pages/Platform";
import Producers from "./pages/Producers";
import Buyers from "./pages/Buyers";
import Freight from "./pages/Freight";
import Compliance from "./pages/Compliance";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="platform" element={<Platform />} />
        <Route path="producers" element={<Producers />} />
        <Route path="buyers" element={<Buyers />} />
        <Route path="freight" element={<Freight />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
      </Route>
    </Routes>
  );
}

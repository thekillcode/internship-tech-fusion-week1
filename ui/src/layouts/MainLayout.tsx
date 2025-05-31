import { Footer, Header, MoveToTop } from "@/pages/frontend/components";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
      <MoveToTop />
      <Footer />
    </div>
  );
}

export default MainLayout;
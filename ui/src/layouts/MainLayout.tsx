import { Footer, Header, MoveToTop } from "@/pages/frontend/components";
import Chatbot from "@/pages/frontend/components/Chatbot";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
      <MoveToTop />
      <Footer />
      <Chatbot />

    </div>
  );
}

export default MainLayout;
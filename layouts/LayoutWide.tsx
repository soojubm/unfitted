import Navbar from "components/navbar";
import Footer from "components/footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="layout" style={{ minHeight: "80vw" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;

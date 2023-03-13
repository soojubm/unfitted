import Navbar from "components/navbar";
import Footer from "components/footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "0 0 4rem" }}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;

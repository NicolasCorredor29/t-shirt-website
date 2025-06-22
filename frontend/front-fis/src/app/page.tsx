import Footer from "@/components/footer";
import { Header } from "@/components/heather";

export default function Home() {
  return (
    <div>
      <header>
        {" "}
        <Header />
      </header>
      <main></main>
      <footer className="flex justify-center">
        <Footer />
      </footer>
    </div>
  );
}

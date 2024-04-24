import { Banking } from "@/components/banking/Banking";
import { Navbar } from "@/components/common/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="gap-9 p-9 mt-10">
        <Banking/>
      </div>
    </div>
  );
}

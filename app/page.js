import { UserButton } from "@clerk/nextjs";
import { Button } from "../components/ui/button";


export default function Home() {
  return (
  <div className="">
    <Button  >
      Click Me
    </Button>
    <UserButton/> 
  </div>
  );
}

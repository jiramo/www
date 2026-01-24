import Link from "next/link";
import Button from "./button";

export default function Cookie() {
  return (
    <div className="p-4 bg-[#101010] border border-[#8a8380] rounded-lg flex items-center gap-6 max-w-6xl mx-auto">
      <div className="fill-[#8a8380]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 256 256"
        >
          <path d="M164.49,163.51a12,12,0,1,1-17,0A12,12,0,0,1,164.49,163.51Zm-81-8a12,12,0,1,0,17,0A12,12,0,0,0,83.51,155.51Zm9-39a12,12,0,1,0-17,0A12,12,0,0,0,92.49,116.49Zm48-1a12,12,0,1,0,0,17A12,12,0,0,0,140.49,115.51ZM232,128A104,104,0,1,1,128,24a8,8,0,0,1,8,8,40,40,0,0,0,40,40,8,8,0,0,1,8,8,40,40,0,0,0,40,40A8,8,0,0,1,232,128Zm-16.31,7.39A56.13,56.13,0,0,1,168.5,87.5a56.13,56.13,0,0,1-47.89-47.19,88,88,0,1,0,95.08,95.08Z"></path>
        </svg>
      </div>
      <div className="text-[#8a8380]">
        This website uses cookies to ensure optimal operation of the website. By
        continuing to browse the site, you agree to the placement of cookies on
        your device under the conditions set out in the <Link href={""}>Privacy Policy</Link>.
      </div>
      <div className="flex gap-2">
        <Button variant="outline">Deny</Button>
        <Button variant="secondary">Accept</Button>
      </div>
    </div>
  );
}

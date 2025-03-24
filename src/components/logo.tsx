
import logo from "@/assets/logos/logo-dark.png";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative flex justify-center items-center h-25 aspect-w-1 aspect-h-1">
      <Image
        src={logo}
        fill
        className="dark:hidden object-contain"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={"/images/logo/logo.svg"} 
        fill
        className="hidden dark:block object-contain"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
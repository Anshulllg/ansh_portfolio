"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

type Company = {
  name: string;
  logo: string;
};

const companies: Company[] = [
  {
    name: "Memboro",
    logo: "/assets/exp/4.png",
  },
  {
    name: "Respct",
    logo: "/assets/exp/5.png",
  },
  {
    name: "Melange Lab",
    logo: "/assets/exp/1.png",
  },
  {
    name: "Ihub Anubhuti",
    logo: "/assets/exp/3.png",
  },
  {
    name: "Graphics Research Group",
    logo: "/assets/exp/2.png",
  },
  {
    name: "NebulaIQ",
    logo: "/assets/exp/6.png",
  },
];

const CompanyCard: React.FC<Company> = ({ logo, name }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-10")}>
      {/* <img className="h-12 w-12 object-contain " alt={name} src={logo} /> */}
      <figcaption className="text-xs font-medium dark:text-white syne-m">
        {name}
      </figcaption>
    </div>
  );
};

export function Workx() {
  return (
    <div className="relative flex h-[60px] w-full items-center justify-center overflow-hidden bg-white/10 md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {companies.map((company) => (
          <CompanyCard key={company.name} {...company} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
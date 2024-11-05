"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

// Define the type for a company
type Company = {
  name: string;
  logo: string;
};

// Companies data
const companies: Company[] = [
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
];

const CompanyCard: React.FC<Company> = ({ logo, name }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-64 h-64 p-4 border rounded-xl",
        "border-gray-300 bg-white hover:bg-gray-100",
        "dark:border-gray-700 dark:bg-[#08080A] dark:hover:bg-gray-900"
      )}
    >
      <img className="h-24 w-24 object-contain mb-4" alt={name} src={logo} />
      <figcaption className="text-lg font-medium dark:text-white">{name}</figcaption>
    </div>
  );
};

// Workx component
export function Workx() {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-background md:shadow-xl">
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

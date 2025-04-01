// import { compactFormat } from "@/lib/format-number";
import Link from "next/link";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const { views, profit, products } = await getOverviewData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {/* <Link href="/Cursos">
      <OverviewCard
        label="Total Views"
        data={{
          ...views,
        
        }}
        Icon={icons.Views}
      />
      </Link> */}

      {/* <Link href="/paginas">
      <OverviewCard
        label="Total Profit"
        data={{
          ...profit,
         
        }}
        Icon={icons.Profit}
      />
    </Link> */}

    <Link href="/pagesmeta">
    
      <OverviewCard
        label="Total Products"
        data={{
          ...products,
          
        }}
        Icon={icons.Product}
      />
    </Link>

      {/* <OverviewCard
        label="Total Users"
        data={{
          ...users,
          value: compactFormat(users.value),
        }}
        Icon={icons.Users}
      /> */}
    </div>
  );
}

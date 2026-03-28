import { ChaiCard } from "./ChaiCard";
import type { Chai } from "./types";

interface ChailistProps {
  items: Chai[];
}

const ChaiList = ({ items }: ChailistProps) => {
  return (
    <div>
      {items.map((chai) => (
        <ChaiCard key={chai.id} name={chai.name} price={chai.price} />
      ))}
    </div>
  );
};

export default ChaiList;

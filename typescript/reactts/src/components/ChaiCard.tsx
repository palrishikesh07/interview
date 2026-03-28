interface IChaiCardProp {
  name: string;
  price: number;
  isSpecial?: boolean;
}

export function ChaiCard({ name, price, isSpecial = false }: IChaiCardProp) {
  return (
    <article>
      <h2>
        {name} {isSpecial ? "(Special)" : ""}
      </h2>
      <p>Price: ${price.toFixed(2)}</p>
    </article>
  );
}

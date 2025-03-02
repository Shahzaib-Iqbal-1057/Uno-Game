interface CardProps {
  name: string;
  value: number;
}

export function Card(card: CardProps) {
  return (
    <div className={`${card.name}`}>
      <span className="inner">
        <span className="mark">{card.value !== 0 && card.value}</span>
      </span>
    </div>
  );
}

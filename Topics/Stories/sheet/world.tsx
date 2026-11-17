import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree } from "../../engine";
import { Apple, Arrow, Balance, Bar, BarChart, Bill, BillStack, Bread, BreadShelf, Bridge, Chest, Coin, CoinPile, CoinStack, Crate, Figure, Icon, Island, MoneyBag, Plinth, PriceTag, Printer, Signpost, Sun, Sam, clock, ease, ramp } from "./kit";

const ICON_KINDS = ["heart", "star", "bolt", "bang", "question", "check", "cross", "up", "down", "eye", "clock", "skull", "coin", "gem", "drop", "crown"] as const;
/** Island n of the sheet: its middle. */
const X = (n: number) => n * 14;

const Parts: React.FC = () => {
  const t = clock.useSince("p.1");
  const grow = ease(ramp(clock.useSince("p.5"), 0.1, 0.9));
  return (
    <>
      {Array.from({ length: 8 }, (_, n) => (
        <Island key={n} position={[X(n), 0, 0]} size={n === 0 ? [7, 6] : [5, 5]} seed={n + 1} />
      ))}
      {/* 1: the stage */}
      <Plinth position={[X(0) - 1.0, 0, 0.4]} height={1} />
      <Coin position={[X(0) - 1.0, 1.42, 0.4]} size={0.62} spin={0.5} />
      <Signpost text="SHOP" position={[X(0) - 2.2, 0, -1.2]} rotationY={0.3} />
      <Sam position={[X(0) + 0.6, 0, 0.6]} rotationY={-0.4} animation="idle" face="smile" />
      <Tree position={[X(0) + 2.4, 0, -1.8]} height={3.0} />
      <Bridge from={[X(0) + 3.5, 0, 0]} to={[X(1) - 2.5, 0, 0]} />

      {/* 2: coins */}
      <Coin position={[X(1) - 0.42, 1.75, -0.4]} kind="gold" size={0.56} spin={0.3} />
      <Coin position={[X(1) + 0.42, 1.75, -0.4]} kind="silver" size={0.56} spin={-0.3} />
      <Coin position={[X(1) - 0.42, 1.05, 0]} kind="copper" size={0.56} spin={0.3} />
      <Coin position={[X(1) + 0.42, 1.05, 0]} kind="emerald" size={0.56} spin={-0.3} />
      <CoinStack position={[X(1) - 0.55, 0, 0.7]} count={5} />
      <CoinStack position={[X(1) - 0.1, 0, 0.6]} count={12.5} kind="emerald" />
      <CoinPile position={[X(1) + 0.45, 0, 0.9]} count={20} spread={0.42} />

      {/* 3: notes, a bag, a chest */}
      <Chest position={[X(2), 0, -0.5]} rotationY={0.15} open={0.9} gold={0.8} />
      <Chest position={[X(2) - 0.55, 0, 0.75]} rotationY={0.4} scale={0.6} />
      <MoneyBag position={[X(2) + 0.5, 0, 0.5]} rotationY={-0.2} />
      <BillStack position={[X(2) - 0.1, 0, 1.05]} count={30} rotationY={0.3} />
      <Bill position={[X(2) + 0.45, 0, 1.25]} rotationY={-0.4} />

      {/* 4: the printer */}
      <Printer position={[X(3), 0, -0.2]} rotationY={0.45} out={9.6 + Math.max(0, t) * 2} />

      {/* 5: a price, and a chart */}
      <BarChart position={[X(4), 0, 0]} values={[0.6, 1.2, 2.2]} labels={["1", "2", "4"]} grow={[1, 1, grow]} width={0.42} gap={0.16} />
      <PriceTag text="5" position={[X(4) - 0.5, 3.75, 0.2]} />
      <PriceTag text="$20" position={[X(4) + 0.35, 3.75, 0.2]} />

      {/* 6: arrows, and the scales */}
      <Balance position={[X(5), 0, 0]} scale={0.72} tilt={-0.8} left={<Bread scale={1.2} />} right={<CoinStack count={5} />} />
      <Arrow position={[X(5) - 0.55, 2.0, 0]} dir="up" length={1.5} />
      <Arrow position={[X(5) + 0.55, 3.5, 0]} dir="down" length={1.5} />

      {/* 7: goods */}
      <BreadShelf position={[X(6), 0, -0.7]} count={5} width={1.5} />
      <Crate position={[X(6) - 0.42, 0, 0.5]} rotationY={0.25} size={0.6} />
      <Bread position={[X(6) - 0.42, 0.6, 0.5]} rotationY={0.25} scale={1.5} />
      <Apple position={[X(6) + 0.42, 0, 0.6]} scale={2} />
      <Bread position={[X(6) + 0.3, 0, 1.15]} rotationY={-0.5} />
      <Apple position={[X(6) - 0.1, 0, 1.3]} color="#7ac64a" />

      {/* 8: figures and icons */}
      <Figure text="+20%" position={[X(7), 3.45, 0]} height={0.44} color="#ff5a4a" />
      <Figure text="$5" position={[X(7) - 0.42, 2.8, 0]} height={0.44} color="#ffd24a" />
      <Figure text="×2" position={[X(7) + 0.42, 2.8, 0]} height={0.44} color="#58d66a" />
      {ICON_KINDS.map((kind, i) => (
        <Icon key={kind} kind={kind} position={[X(7) - 0.66 + (i % 4) * 0.44, 2.15 - Math.floor(i / 4) * 0.46, 0]} height={0.32} />
      ))}
      <Bar position={[X(7) - 0.9, 0, 0.9]} height={0.5} width={0.3} label="3" labelHeight={0.2} />
    </>
  );
};

export const World: React.FC = () => (
  <>
    <Sun position={[-9, 12.5, -40]} size={5} />
    <Clouds y={-14} center={[50, 0, -6]} span={260} opacity={0.9} />
    <Clouds y={34} center={[50, 0, -30]} span={300} />
    <Parts />
    <GodRay position={[-1.5, 5.5, -1]} rotation={[0, 0, 0.5]} width={4} height={11} color="#fff0c8" opacity={0.07} />
    <LightPool position={[0.4, 0.03, 0.4]} width={6} depth={4.6} color="#fff2c8" opacity={0.16} />
    <Glow position={[1.2, 1.6, 0.1]} size={1.8} color="#ffe08a" opacity={0.2} />
    <Dust position={[50, 2, 0]} area={[110, 4, 6]} count={120} size={0.04} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

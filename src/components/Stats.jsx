import React from "react";
import CTA from "../components/CTA";
import Container from "../components/Container";
import { STATS } from "../components/Data.jsx";

function Stats() {
  return (
    <Container className="bg-(--black) text-(--white)">
      <div className="flex justify-between max-md:flex-col max-md:gap-2">
        {STATS.map((stat) => (
          <div
            key={stat.id}
            className="flex max-md:gap-1 gap-2 flex-col items-center"
          >
            <p className="text-6xl max-lg:text-5xl max-md:text-3xl font-[number]">
              {stat.num}
            </p>{" "}
            <p className="max-md:text-lg">{stat.text}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Stats;

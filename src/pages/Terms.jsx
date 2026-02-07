import React from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import { TERMS } from "../components/Data";
import { Dice1 } from "lucide-react";

function Terms() {
  return (
    <Container>
      <div>
        <Header
          title="Terms of Service"
          sub2="Effective Date: 15th November, 2025 "
        />
        <div className="flex flex-col gap-6">
          {TERMS.map((term) => (
            <div
              key={term.id}
              className="text-lg text-[#48486b] flex flex-col gap-2"
            >
              <span className="flex gap-2 items-center text-4xl max-md:text-2xl font-semibold text-(--black)">
                <p className="">{`${term.id}.`}</p>
                <p>{term.title}</p>
              </span>
              <p>{term.para}</p>
              <ul className="list-disc list-inside">
                {term.list?.map((listItem) => (
                  <li key={listItem.id}>{listItem.text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Terms;

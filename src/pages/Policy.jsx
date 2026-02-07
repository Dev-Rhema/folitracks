import React from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import { POLICIES, TERMS } from "../components/Data";
import { Dice1 } from "lucide-react";

function Policy() {
  return (
    <Container>
      <div>
        <Header
          title="Privacy Policy"
          sub2="Effective Date: 15th November, 2025 "
        />
        <div className="flex flex-col gap-6">
          {POLICIES.map((policy) => (
            <div
              key={policy.id}
              className="text-lg text-[#48486b] flex flex-col gap-2"
            >
              <span className="flex gap-2 items-center text-4xl max-md:text-2xl font-semibold text-(--black)">
                <p className="">{`${policy.id}.`}</p>
                <p>{policy.title}</p>
              </span>
              <p>{policy.para}</p>
              <ul className="list-disc list-inside">
                {policy.list?.map((listItem) => (
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

export default Policy;

import React from "react";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard({ amount, max }) {
  return (
    <>
      {max > 0 && (
        <BudgetCard
          name={"Total"}
          hideButtons={true}
          amount={amount}
          max={max}
        />
      )}
    </>
  );
}

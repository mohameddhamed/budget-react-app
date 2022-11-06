import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = createContext({});

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const UNCATID = "UNCAT_ID";
  /*

  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
*/

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addBudget(name, max) {
    setBudgets((prevState) => {
      if (prevState.find((b) => b.name === name)) return prevState;

      return [
        ...prevState,
        {
          id: uuidv4(),
          name: name,
          max: max,
        },
      ];
    });
  }

  function addExpense(description, amount, budgetId) {
    setExpenses((prevState) => [
      ...prevState,
      {
        budgetId: budgetId,
        description: description,
        amount: amount,
      },
    ]);
  }
  function deleteBudget(id) {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATID };
      });
    });
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteBudgetExpenses(budgetId, description) {
    setExpenses((prevState) => {
      return prevState.filter(
        (expense) =>
          expense.budgetId !== budgetId || expense.description !== description
      );
    });
  }
  //function deleteBudgetExpense()

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteBudgetExpenses,
        UNCATID,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};

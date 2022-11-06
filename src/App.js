import Container from "react-bootstrap/Container";
import { Button, Card, Stack } from "react-bootstrap";
import React, { useState } from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "./contexts/BudgetsContext";
import AddBudgetModal from "./modals/AddBudgetModal";
import AddExpenseModal from "./modals/AddExpenseModal";
import UncatBudgetCard from "./UncatBudgetCard";
import TotalBudgetCard from "./TotalBudgetCard";
import ViewExpensesModal from "./modals/ViewExpensesModal";

function App() {
  function openAddExpenseModal(id) {
    setShowAddExpenseModal(true);
    setShowAddExpenseModalBudgetId(id);
  }

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddExpenseModalBudgetId, setShowAddExpenseModalBudgetId] =
    useState("default");
  const [viewExpensesBudgetId, setViewExpensesBudgetId] = useState(false);

  const {
    budgets,
    expenses,
    getBudgetExpenses,
    addExpense,
    addBudget,
    deleteBudget,
    deleteBudgetExpenses,
    UNCATID,
  } = useBudgets();

  //for some reason moving this from very top to here made it work
  const getUncatAmount = () => {
    const expenses = getBudgetExpenses(UNCATID);
    return expenses.reduce((prev, curr) => prev + curr.amount, 0);
  };
  const uncatAmount = getUncatAmount();

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button
            variant="primary"
            onClick={() => {
              setShowAddBudgetModal(true);
            }}
          >
            Add Budget
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => openAddExpenseModal(UNCATID)}
          >
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((b) => {
            const expenses = getBudgetExpenses(b.id);
            const amount = expenses.reduce(
              (prev, curr) => prev + curr.amount,
              0
            );
            return (
              <BudgetCard
                amount={amount}
                max={b.max}
                name={b.name}
                id={b.id}
                openAddExpenseModal={openAddExpenseModal}
                viewExpensesClick={() => setViewExpensesBudgetId(b.id)}
              />
            );
          })}
        </div>

        <UncatBudgetCard
          amount={uncatAmount}
          id={UNCATID}
          openAddExpenseModal={openAddExpenseModal}
          viewExpensesClick={() => {
            setViewExpensesBudgetId(UNCATID);
            console.log("something");
          }}
        />

        <TotalBudgetCard
          amount={expenses
            //.filter((b) => b.budgetId !== UNCATID)
            .reduce((prev, curr) => prev + curr.amount, 0)}
          max={budgets
            //.filter((b) => b.id !== UNCATID)
            .reduce((prev, curr) => prev + curr.max, 0)}
        />
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => {
          setShowAddExpenseModal(false);
        }}
        defaultBudgetId={showAddExpenseModalBudgetId}
      />
      <ViewExpensesModal
        handleClose={() => {
          setViewExpensesBudgetId(false);
        }}
        id={viewExpensesBudgetId}
      />
    </>
  );
}

export default App;

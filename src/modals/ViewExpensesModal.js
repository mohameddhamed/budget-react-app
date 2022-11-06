import { Form, Stack } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import React, { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";
import { v4 as uuid } from "uuid";

export default function ViewExpensesModal({ handleClose, id }) {
  const {
    budgets,
    expenses,
    UNCATID,
    deleteBudget,
    deleteBudgetExpenses,
    getBudgetExpenses,
  } = useBudgets();

  const budget =
    id === UNCATID
      ? { name: "Uncategorized", id: UNCATID }
      : budgets.find((b) => b.id === id);

  return (
    <Modal show={id !== false} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack dir="horizontal" gap="2">
            <div key={budget?.id}> expenses - {budget?.name}</div>
            {id !== UNCATID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  handleClose();
                  deleteBudget(id);
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack dir="vertical" gap="3">
          {getBudgetExpenses(id).map((e) => (
            <Stack dir="horizontal" gap="2" key={uuid()}>
              <div className="me-auto fs-4">{e.description}</div>
              <div className="fs-5">{currencyFormatter.format(e.amount)}</div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteBudgetExpenses(id, e.description)}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

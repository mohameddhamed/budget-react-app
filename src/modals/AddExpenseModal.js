import { Form } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import React, { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddExpenseModal({
  defaultBudgetId,
  show,
  handleClose,
  openAddExpenseModal,
}) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  const { addExpense, addBudget, budgets, UNCATID } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();

    addExpense(
      descriptionRef.current.value,
      parseFloat(amountRef.current.value),
      budgetIdRef.current.value
    );
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" required ref={descriptionRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select
              ref={budgetIdRef}
              defaultValue={defaultBudgetId}
              required
            >
              <option key={UNCATID} value={UNCATID}>
                Uncategorized
              </option>
              {budgets.map((b) => {
                return (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add Expense
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

import React from 'react'
import BudgetCard from './BudgetCard'
import { useBudgets } from './contexts/BudgetsContext'

export default function UncatBudgetCard({amount,id,viewExpensesClick,openAddExpenseModal}) {
  return (
    <>
      {amount>0 &&  
        <BudgetCard amount={amount} id={id} name={'Uncategorized'} 
        viewExpensesClick={viewExpensesClick}
        openAddExpenseModal={openAddExpenseModal} gray
        />
      }
    </>
  )
}

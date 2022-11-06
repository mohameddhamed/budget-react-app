/*
install bootstrap

add this 
*/
(<Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary">
            Add Budget
          </Button>
          <Button variant="outline-primary">
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
        </div>
</Container>)
/*
before div put a budget card component 

copy this html and css */

    (<Card >
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2"></div>
          <div className="d-flex align-items-baseline">
            
              <span className="text-muted fs-6 ms-1">
               
              </span>
            
          </div>
        </Card.Title>
        
          <ProgressBar
            className="rounded-pill"
            
          />
    
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary">
              View Expenses
            </Button>
          </Stack>
        
      </Card.Body>
    </Card>)

/*
create a utils file and paste in the currency formatter
between the card title put two divs one for the name and one for the ratio of the formatted amount and formatted 
max

pass name amount and max as props in the bidget card component

add a variant prop to the progress bar component which is a fct that takes in the amount and max
and return primary if their ratio is less than .5 warning if less than .75 and danger 
also add a min prop which is 0 a max which is max and now which is amount

add gray as one of the props passed to BudgetCard

create an empty array classNames and make it so that if amount is greater than max then the array should 
contain bg-danger and bg-opacity-10 otherwise bg-light
then pass that array transformed into a string as a className to Card

create a folder called contexts and Budgetscontext.js
export a usebudgets function 
and a const arrow function called budget provider which is going to take children

back in index import budgetsprovider and wrap your app within it

in budgets context create context
in use budgets return usecontext of the budgets context
after wrapping your children within the provider you need to pass down to them the 
budgets, expenses, get budget expenses, adding expenses, adding a budget, delete a budget, delete an expense
make budgets and expenses be states

make the get budget expenses a fct that return the expenses that match a budget id from all the expenses
make the addbudget fct update the state of budgets by adding a budget with a random id a name and a max only if the name does not match
another budget's name
the addexpense does the same thing but by adding a description an amount and budgetId
the deletes are just going to update the states by removing the objects that correspond to the ids

create a folder for hooks and make file for useLocalStorage and export it as default
now in Budgetcontext replace the usestate with uselocalstorage and pass a string key and an empty array

create an addbudgetmodal file and make it recieve show and handle close as props then assign them 
to the attributes of show and onHide in Modal
*/
(
<Modal >
<Form onSubmit={handleSubmit}>
  <Modal.Header closeButton>
    <Modal.Title>New Budget</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" required />
    </Form.Group>
    <Form.Group className="mb-3" controlId="max">
      <Form.Label>Maximum Spending</Form.Label>
      <Form.Control
        type="number"
        required
        min={0}
        step={0.01}
      />
    </Form.Group>
    <div className="d-flex justify-content-end">
      <Button variant="primary" type="submit">
        Add
      </Button>
    </div>
  </Modal.Body>
</Form>
</Modal>)
/*
then add it as a component after container in App.js

in addbudgetmodal create a nameRef and maxRef and put them in form control under each of their labels
In handle submit after preventing default, use the fct addBudget with the object that contains 
the name as name ref and max as its parseFloat after getting it from usebudgets

back in app add the attributes show and handleClose to addbudget, show being the state of showaddbudgetmodel and
handle close being its setter to false which is already its default value
make add budget button call be a setter to true to that state

Just before the last div of the container you need to loop over the budgets and display them as cards
and make sure to get budgets from the usebudgets hook
pass in the correct name a key which is its id , get rid of gray and max is from the budget
to get the amount just get the budget expenses getter and and make it the return value of the total of all the expense.amount
(it's the .reduce method)

create an add expense modal which is a copy of the addbudgetmodal 
you're going to also pass to it a default budget id 
and the refs are for the desc, amount, and budget id 
get the add expense and budgets from your usebudgets
and the handle submit is very similar with refs
make new budget say new expense 
replace name with description and max spending with amount
then copy down the form group for budget and swap form.control with form.select
and just leave it with 3 attributes, the default value and the ref and the budgets mapped as options with key being 
their id value is id and name within

then go back to app and add that component 
wait...

go to context and and create an uncategorized budget id constant
then in addexpensemodal put it as the first option with text
add in a app a show add expense modal state as false 
create a fct called openadd expense modal that takes the budget id, sets the show add expense to true 
and sets the add expense modal budget id to the budget id 
and make it called when you click on add expense 
then in the budget card make it called with the budget id on the onAddExpenseClick (it's now a prop so pass it)
then in budget card make it called on the click of add expense 

in app in the addexpense modal make show equal to the state of show add expense modal 
and handleClose to set it to false and don't forget to add the default budget id as the add expense modal budget id 

create a uncategorized budget card component at the end of your container just before the final div
this components needs to have a budget caard within it that will take an amount and a name "uncateg.." as attributes 
and be gray which in themselves are just props
its amount should be similar to the getbudgetexpenses but with an uncategrized id 
this card will not show if the amount is 0
then go back to the original budget card and make the / max only appear is max is true and same with progress bar
make it add expenses on click but without any id specified

create a total budget card component 
the amount should be the expenses reducing and the max should be the budgets reduced
and make hidebuttons prop that only shows add expenses and view expenses buttons if it"s false

view expenses modal should be a copy of add budget modal without refs or handling submits
get rid of the form 
between the modal.title create a stack with dir horiz and gap 2 and within it a div with expenses - and the name of the budget
add a ? after budget so that it takes the case where it could be not defined
make the budget variable an object with name uncat and id uncat if the budget id passed as a prop is uncat
otherwise you"d have to find the budget whose id is equal to the passed id  
also make the show equal the truthness of the budget id
under expenses div create  a delete button with variant outline danger and an onclick with triggers 
the delete budget of budget and a handleclose
and this button should only appear if the budget id is not uncat
delete the content of the modal>body
when you come back to app to implement this component you should let the budgetId equal to the viewExpensesbudgetId state
and the handle close a setter for it

go back to app and create another attribute for budget card called on view expenses click which sets the viewexpenses modal
budget id to the budget.id
same for the uncategorized card but with uncat id

in budget card hook that attribute to onClick over view expenses
in the view expenses modal create a vertical with gap 3 stack and within it loop thru the expenses wihich come from get budget 
expenses with the budgetId, map over them so that for each expense you"d return a stack horiz gap 2 and its key is the id
and inside create a div with the classname me-auto fs-4 and inside put the expenses description 
under it anther div class fs-5 with the formatted expense amount 
and finally a button size sm variant outline danger and within a &times and an onclick which triggers the delete expense with 
expense 
*/
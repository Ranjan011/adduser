import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

function AddUser(props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredage] = useState("");

  const [error, setError] = useState();

  const nameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredage(event.target.value);
  };
  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
        setError({
            title:'Invalid input',
            message :'Please enter a valid name and age(non-empty values).'
        });
      return;
    }
    if (+enteredAge < 1) {
        setError({
            title:'Invalid age',
            message:'Please enter a valid age(> 0).'
        });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredage("");
  };

  const errorHandler = ()=> {
    setError(null);
  };

  return (
    <div>
        {error && (<ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />
        )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="name">Enter Your Name :</label>
          <input
            type="text"
            id="name"
            value={enteredUsername}
            onChange={nameChangeHandler}
          />

          <label htmlFor="age">Enter Your Age :</label>
          <input
            type="number"
            id="age"
            value={enteredAge}
            onChange={ageChangeHandler}
          />

          <Button type="submit">Add User </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;

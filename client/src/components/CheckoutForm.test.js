import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  const { getByText } = render(<CheckoutForm />);
  const formHeader = getByText("Checkout Form")
    expect(formHeader).toBeInTheDocument()
});

test("form shows success message on submit with form details", () => {
  const { getByText, getByLabelText, getByTestId } = render(<CheckoutForm />);

  const handleInput = (label, inputValue) => {
    const input = getByLabelText(label)
    fireEvent.change(input, {target: {value: inputValue}})
  };

  const firstName = "Joe";
  const lastName = "Dirt";
  const address = "2635 Dirt Rd";
  const city = "Miami";
  const state = "FL";
  const zip = "93323";

  handleInput("First Name:", firstName);
  handleInput("Last Name:", lastName);
  handleInput("Address:", address);
  handleInput("City:", city);
  handleInput("State:", state);
  handleInput("Zip:", zip);

  const checkoutButton = getByText("Checkout");
  
  fireEvent.click(checkoutButton);

  const successMessage = getByTestId("successMessage");

  expect(successMessage.textContent)
    .toBe(`You have ordered some plants! Woo-hoo! 🎉Your new green friends will be shipped to:${firstName} ${lastName}${address}${city}, ${state} ${zip}`)
});
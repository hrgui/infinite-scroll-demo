import { render, screen } from "@testing-library/react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import App from "./App";

it("should show an infinite list of projects that can be endlessly scrolled down", async () => {
  render(<App />);

  expect(await screen.findByText(/Project 1/)).toBeVisible();

  mockAllIsIntersecting(true);

  expect(await screen.findByText(/Project 6/)).toBeVisible();

  mockAllIsIntersecting(true);

  expect(await screen.findByText(/Project 11/)).toBeVisible();
});

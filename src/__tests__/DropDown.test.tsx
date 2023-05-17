import "@testing-library/jest-dom/extend-expect";
import Dropdown from "../components/Dropdown";
import { render } from "@testing-library/react";

it("should return sum correctly", () => {
  const { getByText } = render(<Dropdown selectedCurrency="usd" onChangeCurrency={() => {}} />);
  expect(getByText("usd")).toBeInTheDocument();
});

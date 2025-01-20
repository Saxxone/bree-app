import * as React from "react";
import { render } from "@testing-library/react-native";

import Text from "../app/Text";

it(`renders correctly`, () => {
  const tree = render(<Text>Snapshot test!</Text>).toJSON();

  expect(tree).toMatchSnapshot();
});

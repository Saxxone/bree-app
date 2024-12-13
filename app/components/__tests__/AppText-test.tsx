import * as React from "react";
import renderer from "react-test-renderer";

import AppText from "../app/AppText";

it(`renders correctly`, () => {
  const tree = renderer.create(<AppText>Snapshot test!</AppText>).toJSON();

  expect(tree).toMatchSnapshot();
});

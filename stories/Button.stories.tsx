import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button, StyledButton } from "./Button";
import ShinyButton from "../components/core/Button/styled/ShinyButton";

export default {
  title: "Example/Button",
  component: ShinyButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ShinyButton>;

const Template: ComponentStory<typeof ShinyButton> = (args) => (
  <ShinyButton
    backgroundColor="#d1703c"
    textColor="#ffffff"
    children="SHINY EFFECT"
    {...args}
  />
);

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  backgroundColor: "blue",
};

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button",
// };

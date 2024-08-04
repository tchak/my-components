import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Form } from '../../src/components/ui/Form';
import { Button } from '../../src/components/ui/Button';
import { Checkbox, CheckboxGroup } from '../../src/components/ui/Checkbox';

const meta = {
  title: 'UI/CheckboxGroup',
  component: CheckboxGroup,
  args: {
    label: 'Cities',
    isDisabled: false,
    isRequired: false,
    description: '',
    children: (
      <>
        <Checkbox value="sf">San Francisco</Checkbox>
        <Checkbox value="ny">New York</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </>
    ),
    onChange: fn(),
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};

export const Validation: Story = {
  args: {
    isRequired: true,
  },
  render: (args) => (
    <Form className="flex flex-col gap-2 items-start">
      <CheckboxGroup {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
};

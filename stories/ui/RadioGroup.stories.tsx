import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../../src/components/ui/Form';
import { Button } from '../../src/components/ui/Button';
import { Radio, RadioGroup } from '../../src/components/ui/RadioGroup';

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  args: {
    label: 'Favorite sport',
    isDisabled: false,
    isRequired: false,
    description: '',
    children: (
      <>
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </>
    ),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};

export const Validation: Story = {
  args: { isRequired: true },
  render: (args) => (
    <Form className="flex flex-col gap-2 items-start">
      <RadioGroup {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
};

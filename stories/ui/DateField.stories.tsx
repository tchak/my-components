import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Form } from '../../src/components/ui/Form';
import { Button } from '../../src/components/ui/Button';
import { DateField } from '../../src/components/ui/DateField';

const meta = {
  title: 'UI/DateField',
  component: DateField,
  args: {
    label: 'Event date',
    onChange: fn(),
  },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => <DateField {...args} />,
};

export const Validation: Story = {
  args: { isRequired: true },
  render: (args) => (
    <Form className="flex flex-col gap-2 items-start">
      <DateField {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
};

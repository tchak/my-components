import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Form } from '../../src/components/ui/Form';
import { Button } from '../../src/components/ui/Button';
import { DatePicker } from '../../src/components/ui/DatePicker';

const meta = {
  title: 'UI/DatePicker',
  component: DatePicker,
  args: {
    label: 'Event date',
    onChange: fn(),
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = { render: (args) => <DatePicker {...args} /> };

export const Validation: Story = {
  args: { isRequired: true },
  render: (args) => (
    <Form className="flex flex-col gap-2 items-start">
      <DatePicker {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
};

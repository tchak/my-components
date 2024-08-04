import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../../src/components/ui/Form';
import { Button } from '../../src/components/ui/Button';
import { DateRangePicker } from '../../src/components/ui/DateRangePicker';

const meta = {
  component: DateRangePicker,
  args: {
    label: 'Trip dates',
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => <DateRangePicker {...args} />,
};

export const Validation: Story = {
  args: { isRequired: true },
  render: (args) => (
    <Form className="flex flex-col gap-2 items-start">
      <DateRangePicker {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
};

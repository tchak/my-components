import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../../src/components/ui/Form';
import { Button } from '../../src/components/ui/Button';
import { TimeField } from '../../src/components/ui/TimeField';

const meta = {
  title: 'UI/TimeField',
  component: TimeField,
  args: {
    label: 'Event time',
  },
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => <TimeField {...args} />,
};

export const Validation: Story = {
  args: { isRequired: true },
  render: (args) => (
    <Form className="flex flex-col gap-2 items-start">
      <TimeField {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
};

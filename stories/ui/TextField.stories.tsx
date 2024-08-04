import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../../src/components/ui/Form';
import { Button } from '../../src/components/ui/Button';
import { TextField } from '../../src/components/ui/TextField';

const meta = {
  title: 'UI/TextField',
  component: TextField,
  args: {
    label: 'Name',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => <TextField {...args} />,
};

export const Validation: Story = {
  args: { isRequired: true },
  render: (args) => (
    <Form className="flex flex-col gap-2 items-start">
      <TextField {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
};

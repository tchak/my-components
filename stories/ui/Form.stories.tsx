import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../../src/components/ui/Form';
import { Button } from '../../src/components/ui/Button';
import { DateField } from '../../src/components/ui/DateField';
import { TextField } from '../../src/components/ui/TextField';

const meta = {
  title: 'UI/Form',
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <Form {...args}>
      <TextField label="Email" name="email" type="email" isRequired />
      <DateField label="Birth date" isRequired />
      <div className="flex gap-2">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
  ),
};

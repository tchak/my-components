import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Form } from '../../src/components/ui/Form';
import { Button } from '../../src/components/ui/Button';
import { NumberField } from '../../src/components/ui/NumberField';

const meta = {
  title: 'UI/NumberField',
  component: NumberField,
  args: {
    label: 'Cookies',
    onChange: fn(),
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = { render: (args) => <NumberField {...args} /> };

export const Validation: Story = {
  args: { isRequired: true },
  render: (args) => (
    <Form className="flex flex-col gap-2 items-start">
      <NumberField {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
};

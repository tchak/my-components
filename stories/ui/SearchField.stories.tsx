import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Form } from '../../src/components/ui/Form';
import { Button } from '../../src/components/ui/Button';
import { SearchField } from '../../src/components/ui/SearchField';

const meta = {
  title: 'UI/SearchField',
  component: SearchField,
  args: {
    label: 'Search',
    onChange: fn(),
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => <SearchField {...args} />,
};

export const Validation: Story = {
  args: { isRequired: true },
  render: (args) => (
    <Form className="flex flex-col gap-2 items-start">
      <SearchField {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
};

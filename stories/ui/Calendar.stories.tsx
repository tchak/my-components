import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Calendar } from '../../src/components/ui/Calendar';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => <Calendar aria-label="Event date" {...args} />,
};

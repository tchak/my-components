import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { RangeCalendar } from '../../src/components/ui/RangeCalendar';

const meta = {
  title: 'UI/RangeCalendar',
  component: RangeCalendar,
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof RangeCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => <RangeCalendar aria-label="Trip dates" {...args} />,
};

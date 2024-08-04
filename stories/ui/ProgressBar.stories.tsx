import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from '../../src/components/ui/ProgressBar';

const meta = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: 'Loading…',
    value: 80,
  },
  render: (args) => <ProgressBar {...args} />,
};

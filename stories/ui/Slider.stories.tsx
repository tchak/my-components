import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Slider } from '../../src/components/ui/Slider';

const meta = {
  title: 'UI/Slider',
  component: Slider,
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: 'Range',
    defaultValue: [30, 60],
    thumbLabels: ['start', 'end'],
  },
  render: (args) => <Slider {...args} />,
};

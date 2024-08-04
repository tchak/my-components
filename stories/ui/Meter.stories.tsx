import type { Meta, StoryObj } from '@storybook/react';
import { Meter } from '../../src/components/ui/Meter';

const meta = {
  title: 'UI/Meter',
  component: Meter,
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: 'Storage space',
    value: 80,
  },
  render: (args) => <Meter {...args} />,
};

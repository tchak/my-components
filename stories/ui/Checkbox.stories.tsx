import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../../src/components/ui/Checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  args: {
    isDisabled: false,
    children: 'Checkbox',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};

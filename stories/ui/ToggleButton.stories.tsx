import type { Meta, StoryObj } from '@storybook/react';

import { ToggleButton } from '../../src/components/ui/ToggleButton';

const meta = {
  title: 'UI/ToggleButton',
  component: ToggleButton,
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => <ToggleButton {...args}>Pin</ToggleButton>,
};

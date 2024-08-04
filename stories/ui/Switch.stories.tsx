import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Switch } from '../../src/components/ui/Switch';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  args: { onChange: fn(), children: null },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => <Switch {...args}>Wi-Fi</Switch>,
};

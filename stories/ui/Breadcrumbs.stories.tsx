import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Breadcrumb, Breadcrumbs } from '../../src/components/ui/Breadcrumbs';

const meta = {
  title: 'UI/Breadcrumbs',
  component: Breadcrumbs,
  args: {
    onAction: fn(),
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumb href="/">Home</Breadcrumb>
      <Breadcrumb href="/react-aria">React Aria</Breadcrumb>
      <Breadcrumb>Breadcrumbs</Breadcrumb>
    </Breadcrumbs>
  ),
};

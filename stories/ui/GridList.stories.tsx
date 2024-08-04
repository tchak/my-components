import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { GridList, GridListItem } from '../../src/components/ui/GridList';

const meta = {
  title: 'UI/GridList',
  component: GridList,
  args: {
    onAction: fn(),
  },
} satisfies Meta<typeof GridList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    selectionMode: 'multiple',
  },
  render: (args) => (
    <GridList aria-label="Ice cream flavors" {...args}>
      <GridListItem id="chocolate">Chocolate</GridListItem>
      <GridListItem id="mint">Mint</GridListItem>
      <GridListItem id="strawberry">Strawberry</GridListItem>
      <GridListItem id="vanilla">Vanilla</GridListItem>
    </GridList>
  ),
};

export const DisabledItems: Story = {
  args: {
    disabledKeys: ['mint'],
  },
  render: (args) => (
    <GridList aria-label="Ice cream flavors" {...args}>
      <GridListItem id="chocolate">Chocolate</GridListItem>
      <GridListItem id="mint">Mint</GridListItem>
      <GridListItem id="strawberry">Strawberry</GridListItem>
      <GridListItem id="vanilla">Vanilla</GridListItem>
    </GridList>
  ),
};

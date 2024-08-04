import type { Meta, StoryObj } from '@storybook/react';
import { ListBox, ListBoxItem } from '../../src/components/ui/ListBox';

const meta = {
  title: 'UI/ListBox',
  component: ListBox,
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: { selectionMode: 'multiple' },
  render: (args) => (
    <ListBox aria-label="Ice cream flavor" {...args}>
      <ListBoxItem id="chocolate">Chocolate</ListBoxItem>
      <ListBoxItem id="mint">Mint</ListBoxItem>
      <ListBoxItem id="strawberry">Strawberry</ListBoxItem>
      <ListBoxItem id="vanilla">Vanilla</ListBoxItem>
    </ListBox>
  ),
};

export const DisabledItems: Story = {
  args: { disabledKeys: ['mint'] },
  render: (args) => (
    <ListBox aria-label="Ice cream flavor" {...args}>
      <ListBoxItem id="chocolate">Chocolate</ListBoxItem>
      <ListBoxItem id="mint">Mint</ListBoxItem>
      <ListBoxItem id="strawberry">Strawberry</ListBoxItem>
      <ListBoxItem id="vanilla">Vanilla</ListBoxItem>
    </ListBox>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Tag, TagGroup } from '../../src/components/ui/TagGroup';

const meta = {
  title: 'UI/TagGroup',
  component: TagGroup,
  args: {
    onSelectionChange: fn(),
    onRemove: fn(),
  },
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: 'Ice cream flavor',
    selectionMode: 'single',
  },
  render: (args) => (
    <TagGroup {...args}>
      <Tag>Chocolate</Tag>
      <Tag>Mint</Tag>
      <Tag>Strawberry</Tag>
      <Tag>Vanilla</Tag>
    </TagGroup>
  ),
};

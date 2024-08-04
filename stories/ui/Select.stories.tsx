import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Form } from '../../src/components/ui/Form';
import { Button } from '../../src/components/ui/Button';
import {
  Select,
  SelectItem,
  SelectSection,
} from '../../src/components/ui/Select';

const meta = {
  title: 'UI/Select',
  component: Select,
  args: {
    label: 'Ice cream flavor',
    onSelectionChange: fn(),
    children: null,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectItem>Chocolate</SelectItem>
      <SelectItem id="mint">Mint</SelectItem>
      <SelectItem>Strawberry</SelectItem>
      <SelectItem>Vanilla</SelectItem>
    </Select>
  ),
};

export const DisabledItems: Story = {
  args: { disabledKeys: ['mint'] },
  render: (args) => (
    <Select {...args}>
      <SelectItem>Chocolate</SelectItem>
      <SelectItem id="mint">Mint</SelectItem>
      <SelectItem>Strawberry</SelectItem>
      <SelectItem>Vanilla</SelectItem>
    </Select>
  ),
};

export const Sections: Story = {
  args: { label: 'Preferred fruit or vegetable' },
  render: (args) => (
    <Select {...args}>
      <SelectSection title="Fruit">
        <SelectItem id="Apple">Apple</SelectItem>
        <SelectItem id="Banana">Banana</SelectItem>
        <SelectItem id="Orange">Orange</SelectItem>
        <SelectItem id="Honeydew">Honeydew</SelectItem>
        <SelectItem id="Grapes">Grapes</SelectItem>
        <SelectItem id="Watermelon">Watermelon</SelectItem>
        <SelectItem id="Cantaloupe">Cantaloupe</SelectItem>
        <SelectItem id="Pear">Pear</SelectItem>
      </SelectSection>
      <SelectSection title="Vegetable">
        <SelectItem id="Cabbage">Cabbage</SelectItem>
        <SelectItem id="Broccoli">Broccoli</SelectItem>
        <SelectItem id="Carrots">Carrots</SelectItem>
        <SelectItem id="Lettuce">Lettuce</SelectItem>
        <SelectItem id="Spinach">Spinach</SelectItem>
        <SelectItem id="Bok Choy">Bok Choy</SelectItem>
        <SelectItem id="Cauliflower">Cauliflower</SelectItem>
        <SelectItem id="Potatoes">Potatoes</SelectItem>
      </SelectSection>
    </Select>
  ),
};

export const Validation: Story = {
  args: { isRequired: true },
  render: (args) => (
    <Form className="flex flex-col gap-2 items-start">
      <Select {...args}>
        <SelectItem>Chocolate</SelectItem>
        <SelectItem id="mint">Mint</SelectItem>
        <SelectItem>Strawberry</SelectItem>
        <SelectItem>Vanilla</SelectItem>
      </Select>
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
};

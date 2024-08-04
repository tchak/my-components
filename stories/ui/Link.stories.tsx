import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../../src/components/ui/Link';

const meta = {
  title: 'UI/Link',
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: { href: 'https://www.imdb.com/title/tt6348138/', target: '_blank' },
  render: (args) => <Link {...args}>The missing link</Link>,
};

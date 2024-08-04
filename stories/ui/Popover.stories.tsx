import type { Meta, StoryObj } from '@storybook/react';

import { HelpCircle } from 'lucide-react';
import { DialogTrigger, Heading } from 'react-aria-components';
import { Button } from '../../src/components/ui/Button';
import { Dialog } from '../../src/components/ui/Dialog';
import { Popover } from '../../src/components/ui/Popover';

const meta = {
  title: 'UI/Popover',
  component: Popover,
  args: {
    showArrow: true,
    children: null,
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <DialogTrigger>
      <Button variant="icon" aria-label="Help">
        <HelpCircle className="w-4 h-4" />
      </Button>
      <Popover {...args} className="max-w-[250px]">
        <Dialog>
          <Heading slot="title" className="text-lg font-semibold mb-2">
            Help
          </Heading>
          <p className="text-sm">
            For help accessing your account, please contact support.
          </p>
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};

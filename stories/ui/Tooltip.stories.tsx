import type { Meta, StoryObj } from '@storybook/react';
import { PrinterIcon, SaveIcon } from 'lucide-react';

import { Button } from '../../src/components/ui/Button';
import { Tooltip, TooltipTrigger } from '../../src/components/ui/Tooltip';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  args: { children: null },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <TooltipTrigger>
        <Button variant="secondary" className="px-2">
          <SaveIcon className="w-5 h-5" />
        </Button>
        <Tooltip {...args}>Save</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="secondary" className="px-2">
          <PrinterIcon className="w-5 h-5" />
        </Button>
        <Tooltip {...args}>Print</Tooltip>
      </TooltipTrigger>
    </div>
  ),
};

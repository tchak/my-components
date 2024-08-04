import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { DialogTrigger } from '../../src/components/ui/Dialog';
import { AlertDialog } from '../../src/components/ui/AlertDialog';
import { Button } from '../../src/components/ui/Button';
import { Modal } from '../../src/components/ui/Modal';

const meta = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  args: {
    onAction: fn(),
    title: 'Delete folder',
    children:
      'Are you sure you want to delete "Documents"? All contents will be permanently destroyed.',
    variant: 'destructive',
    actionLabel: 'Delete',
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <DialogTrigger>
      <Button variant="secondary">Delete…</Button>
      <Modal>
        <AlertDialog {...args} />
      </Modal>
    </DialogTrigger>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';
import { Group } from 'react-aria-components';

import { Button } from '../../src/components/ui/Button';
import { Checkbox } from '../../src/components/ui/Checkbox';
import { Separator } from '../../src/components/ui/Separator';
import { ToggleButton } from '../../src/components/ui/ToggleButton';
import { Toolbar } from '../../src/components/ui/Toolbar';

const meta = {
  title: 'UI/Toolbar',
  component: Toolbar,
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => (
    <Toolbar aria-label="Text formatting" {...args}>
      <Group aria-label="Style" className="contents">
        <ToggleButton aria-label="Bold" className="p-2.5">
          <BoldIcon className="w-4 h-4" />
        </ToggleButton>
        <ToggleButton aria-label="Italic" className="p-2.5">
          <ItalicIcon className="w-4 h-4" />
        </ToggleButton>
        <ToggleButton aria-label="Underline" className="p-2.5">
          <UnderlineIcon className="w-4 h-4" />
        </ToggleButton>
      </Group>
      <Separator
        orientation={
          args.orientation === 'vertical' ? 'horizontal' : 'vertical'
        }
      />
      <Group aria-label="Clipboard" className="contents">
        <Button variant="secondary">Copy</Button>
        <Button variant="secondary">Paste</Button>
        <Button variant="secondary">Cut</Button>
      </Group>
      <Separator
        orientation={
          args.orientation === 'vertical' ? 'horizontal' : 'vertical'
        }
      />
      <Checkbox>Night Mode</Checkbox>
    </Toolbar>
  ),
};

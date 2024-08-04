import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { PatternEditor } from '../../src/components/app/PatternEditor';

const meta = {
  title: 'App/PatternEditor',
  component: PatternEditor,
  args: {
    pattern: {
      segments: [
        {
          type: 'char',
          char: '@',
        },
        { type: 'alpha', size: 4 },
        { type: 'numeric', size: 4 },
        {
          type: 'or',
          segments: [
            { type: 'numeric', size: 3 },
            { type: 'numeric', size: 5 },
            { type: 'char', char: 'test' },
            { type: 'alpha', size: 2 },
          ],
        },
        { type: 'alphanumeric', size: 2 },
      ],
      separator: '-',
    },
    onChange: fn(),
  },
} satisfies Meta<typeof PatternEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args) => <PatternEditor {...args} />,
};

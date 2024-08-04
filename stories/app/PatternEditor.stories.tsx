import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { SegmentType } from '../../src/lib/pattern';
import { PatternEditor } from '../../src/components/app/PatternEditor';

const meta = {
  title: 'App/PatternEditor',
  component: PatternEditor,
  args: {
    pattern: {
      segments: [
        {
          type: SegmentType.Char,
          char: '@',
        },
        { type: SegmentType.Alpha, size: 4 },
        { type: SegmentType.Numeric, size: 4 },
        {
          type: SegmentType.Or,
          segments: [
            { type: SegmentType.Numeric, size: 3 },
            { type: SegmentType.Numeric, size: 5 },
            { type: SegmentType.Char, char: 'test' },
            { type: SegmentType.Alpha, size: 2 },
          ],
        },
        { type: SegmentType.Alphanumeric, size: 2 },
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

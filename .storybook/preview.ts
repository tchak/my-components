import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react';
import { themes } from '@storybook/theming';
import '../src/index.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? themes.dark
        : themes.light,
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
  ],
} satisfies Preview;

export default preview;

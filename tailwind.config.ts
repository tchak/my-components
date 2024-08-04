import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';
import tailwindReactAriaComponents from 'tailwindcss-react-aria-components';

export default {
  content: ['./src/**/*.{ts,tsx}', './stories/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'selector',
  plugins: [tailwindReactAriaComponents, tailwindAnimate],
} satisfies Config;

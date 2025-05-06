import '@/styles/globals.css';

import { Work_Sans, Plus_Jakarta_Sans, Source_Serif_4 } from 'next/font/google';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-work-sans',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-source-serif',
});

export const decorators = [
  (Story) => (
    <div className={`${workSans.variable} ${plusJakarta.variable} ${sourceSerif.variable}`}>
      <Story />
    </div>
  ),
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'responsive',
  },
};

import Hero from './Hero';
import { ThemeProvider } from 'components/ThemeContext'; // Make sure the path is correct
import { AuthProvider } from 'context/AuthContext'; // Make sure the path is correct

export default {
  title: 'components/Hero',
  component: Hero,
};

const mockTheme = {
  theme: 'light', // or 'dark' depending on the theme you want to mock
  toggleTheme: () => {}, // Mocked toggle function
};

const mockAuth = {
  user: null, // or mock a user object, e.g., { name: 'John Doe' }
  logout: () => {}, // Mock logout function
};

export const Default = () => (
  <ThemeProvider value={mockTheme}>
    <AuthProvider value={mockAuth}>
      <Hero />
    </AuthProvider>
  </ThemeProvider>
);

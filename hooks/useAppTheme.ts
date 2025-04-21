import { useTheme } from '@/constants/ThemeContext';
import Colors from '@/constants/Colors';

export function useAppTheme() {
  const { isDarkMode } = useTheme();
  return {
    isDarkMode,
    theme: isDarkMode ? Colors.dark : Colors.light,
    Colors,
  };
} 
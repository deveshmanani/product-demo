import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleTheme } from '@/features/ui/uiSlice';

interface UseThemeReturn {
  isDark: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

  return {
    isDark: theme === 'dark',
    theme,
    toggleTheme: () => dispatch(toggleTheme()),
  };
};

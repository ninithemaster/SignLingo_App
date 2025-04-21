// Base colors
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// Light theme colors
const COLOR_BEIGE_LIGHT = '#F5EFEB';
const COLOR_WHITE = '#FFFFFF';
const COLOR_TEXT_LIGHT = '#000000';
const COLOR_SUBTITLE_LIGHT = '#5D7A8D';
const COLOR_BORDER_LIGHT = '#C8D9E6';
const COLOR_FEATURE_BLUE = '#87A6BB';
const COLOR_DANGER = '#E74C3C';
const COLOR_INPUT_BORDER_LIGHT = '#E0E0E0';
const COLOR_PLACEHOLDER_LIGHT = '#9CA3AF';

// Dark theme colors
const COLOR_BEIGE_DARK = '#1A1A1A';
const COLOR_DARK_CARD = '#2A2A2A';
const COLOR_TEXT_DARK = '#FFFFFF';
const COLOR_SUBTITLE_DARK = '#A0A0A0';
const COLOR_BORDER_DARK = '#404040';
const COLOR_INPUT_BORDER_DARK = '#404040';
const COLOR_PLACEHOLDER_DARK = '#6B7280';

export default {
  light: {
    primary: COLOR_FEATURE_BLUE,
    text: COLOR_TEXT_LIGHT,
    background: COLOR_BEIGE_LIGHT,
    cardBackground: COLOR_WHITE,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    headerBackground: COLOR_WHITE,
    subtitle: COLOR_SUBTITLE_LIGHT,
    border: COLOR_BORDER_LIGHT,
    danger: COLOR_DANGER,
    feature: COLOR_FEATURE_BLUE,
    inputBackground: COLOR_WHITE,
    inputBorder: COLOR_INPUT_BORDER_LIGHT,
    placeholder: COLOR_PLACEHOLDER_LIGHT,
    buttonText: COLOR_WHITE,
    link: COLOR_FEATURE_BLUE,
  },
  dark: {
    primary: COLOR_FEATURE_BLUE,
    text: COLOR_TEXT_DARK,
    background: COLOR_BEIGE_DARK,
    cardBackground: COLOR_DARK_CARD,
    tint: tintColorDark,
    tabIconDefault: '#666',
    tabIconSelected: tintColorDark,
    headerBackground: COLOR_DARK_CARD,
    subtitle: COLOR_SUBTITLE_DARK,
    border: COLOR_BORDER_DARK,
    danger: COLOR_DANGER,
    feature: COLOR_FEATURE_BLUE,
    inputBackground: COLOR_DARK_CARD,
    inputBorder: COLOR_INPUT_BORDER_DARK,
    placeholder: COLOR_PLACEHOLDER_DARK,
    buttonText: COLOR_WHITE,
    link: COLOR_FEATURE_BLUE,
  },
};

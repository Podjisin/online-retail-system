/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import DayJsAdapter from "@date-io/dayjs";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    "surface-bright": "#FFFFFF",
    "surface-light": "#EEEEEE",
    "surface-variant": "#424242",
    "on-surface-variant": "#EEEEEE",
    primary: "#1867C0",
    "primary-darken-1": "#1F5592",
    secondary: "#48A9A6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
  variables: {
    "border-color": "#000000",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.04,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};

const myCustomChocolateTheme = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#D2B48C", // Chocolate
    "surface-bright": "#E6CBA5", // Lighter Chocolate
    "surface-light": "#C0A68B", // Dark Chocolate
    "surface-variant": "#8B4513", // Chocolate Brown
    "on-surface-variant": "#FFFFFF", // White
    primary: "#5D4037", // Dark Brown
    "primary-darken-1": "#4E342E", // Even Darker Brown
    secondary: "#A1887F", // Light Brown
    "secondary-darken-1": "#795548", // Another Shade of Brown
    error: "#B71C1C", // Reddish Brown
    info: "#1976D2", // Blue
    success: "#388E3C", // Green
    warning: "#FFA000", // Yellow
  },
  variables: {
    "border-color": "#000000",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.04,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};

const myCustomBananaYellowTheme = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFE21F", // Banana Yellow
    "surface-bright": "#FFEE74", // Shandy
    "surface-light": "#BBBBBE", // X11 Gray
    "surface-variant": "#676767", // Granite Gray
    "on-surface-variant": "#FFFFFF", // White
    primary: "#3E63DB", // Royal Blue
    "primary-darken-1": "#2630D0", // Palatinate Blue
    secondary: "#2630D0", // Palatinate Blue
    "secondary-darken-1": "#3E63DB", // Royal Blue
    error: "#FF0000", // Red (Not provided, using default)
    info: "#0000FF", // Blue (Not provided, using default)
    success: "#008000", // Green (Not provided, using default)
    warning: "#FFA500", // Orange (Not provided, using default)
  },
  variables: {
    "border-color": "#000000",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.04,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};

const myCustomSolarizedTheme = {
  dark: false, // You can set this to true for the dark variant
  colors: {
    background: "#FDF6E3", // Base3 (Light) / Base03 (Dark)
    surface: "#EEE8D5", // Base2 (Light) / Base02 (Dark)
    "surface-bright": "#FDF6E3", // Base3 (Light) / Base03 (Dark)
    "surface-light": "#EEE8D5", // Base2 (Light) / Base02 (Dark)
    "surface-variant": "#586E75", // Base01 (Light) / Base01 (Dark)
    "on-surface-variant": "#FFFFFF", // Base3 (Light) / Base0 (Dark)
    primary: "#268BD2", // Solarized Blue
    "primary-darken-1": "#2AA198", // Solarized Cyan
    secondary: "#DC322F", // Solarized Red
    "secondary-darken-1": "#D33682", // Solarized Magenta
    error: "#B58900", // Solarized Yellow
    info: "#859900", // Solarized Green
    success: "#2ECC71", // Solarized Green
    warning: "#CB4B16", // Solarized Orange
  },
  variables: {
    "border-color": "#000000",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.04,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};

const myCustomBlueVioletTheme = {
  dark: false,
  colors: {
    background: "#F8F8FF", // Ghost White
    surface: "#E6E6FA", // Lavender
    "surface-bright": "#FFFFFF", // White
    "surface-light": "#D8BFD8", // Thistle
    "surface-variant": "#8A2BE2", // Blue Violet
    "on-surface-variant": "#FFFFFF", // White
    primary: "#6A5ACD", // Slate Blue
    "primary-darken-1": "#483D8B", // Dark Slate Blue
    secondary: "#8A2BE2", // Blue Violet
    "secondary-darken-1": "#9370DB", // Medium Purple
    error: "#FF0000", // Red (Not provided, using default)
    info: "#0000FF", // Blue (Not provided, using default)
    success: "#008000", // Green (Not provided, using default)
    warning: "#FFA500", // Orange (Not provided, using default)
  },
  variables: {
    "border-color": "#000000",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.04,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};

const myCustomHelloKittyPinkTheme = {
  dark: false,
  colors: {
    background: "#FFFFFF", // White
    surface: "#FF69B4", // Hello Kitty Pink
    "surface-bright": "#FFC0CB", // Pink
    "surface-light": "#FFE4E1", // Misty Rose
    "surface-variant": "#C71585", // Medium Violet Red
    "on-surface-variant": "#FFFFFF", // White
    primary: "#000000", // Black
    "primary-darken-1": "#333333", // Darker Black
    secondary: "#FF69B4", // Hello Kitty Pink
    "secondary-darken-1": "#C71585", // Medium Violet Red
    error: "#FF0000", // Red (Not provided, using default)
    info: "#0000FF", // Blue (Not provided, using default)
    success: "#008000", // Green (Not provided, using default)
    warning: "#FFA500", // Orange (Not provided, using default)
  },
  variables: {
    "border-color": "#000000",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.04,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};

const BluePinkTheme = {
  dark: false,
  colors: {
    background: "#FFFFFF", // White
    surface: "#502688", // KSU Purple
    "surface-bright": "#8F61DB", // Medium Purple
    "surface-light": "#FC90AF", // Baker-Miller Pink
    "surface-variant": "#EDBBCE", // Cameo Pink
    "on-surface-variant": "#000000", // Black
    primary: "#EFDCCE", // Almond
    "primary-darken-1": "#EFDCCE", // Almond
    secondary: "#2E36AA", // Pigment Blue
    "secondary-darken-1": "#2E36AA", // Pigment Blue
    error: "#FF0000", // Red (Not provided, using default)
    info: "#0000FF", // Blue (Not provided, using default)
    success: "#008000", // Green (Not provided, using default)
    warning: "#FFA500", // Orange (Not provided, using default)
  },
  variables: {
    "border-color": "#000000",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.04,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};

const KSUPurpleTheme = {
  dark: false,
  colors: {
    background: "#FFFFFF", // White
    surface: "#502688", // KSU Purple
    "surface-bright": "#8F61DB", // Medium Purple
    "surface-light": "#EDBBCE", // Cameo Pink
    "surface-variant": "#FC90AF", // Baker-Miller Pink
    "on-surface-variant": "#FFFFFF", // White
    primary: "#502688", // KSU Purple
    "primary-darken-1": "#2E36AA", // Pigment Blue
    secondary: "#FC90AF", // Baker-Miller Pink
    "secondary-darken-1": "#EDBBCE", // Cameo Pink
    error: "#FFCCCC", // Lighter Red
    info: "#CCCCFF", // Lighter Blue
    success: "#B3FFCC", // Lighter Green
    warning: "#FFE5B3", // Lighter Orange
  },
  variables: {
    "border-color": "#000000",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.04,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};

export default createVuetify({
  date: {
    adapter: DayJsAdapter,
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    variations: {
      colors: [
        "primary",
        "secondary",
        "surface-bright",
        "surface-light",
        "surface-variant",
        "on-surface-variant",
      ],
    },
    themes: {
      light: myCustomLightTheme,
      chocolate: myCustomChocolateTheme,
      bananaYellow: myCustomBananaYellowTheme,
      solarized: myCustomSolarizedTheme,
      blueViolet: myCustomBlueVioletTheme,
      helloKittyPink: myCustomHelloKittyPinkTheme,
      bluePink: BluePinkTheme,
      ksuPurple: KSUPurpleTheme,
    },
  },
});

export type ColorTheme = {
  id: string
  name: string
  colors: {
    background: string
    foreground: string
    primary: string
    secondary: string
    accent: string
    border: string
    muted?: string
    "muted-foreground"?: string
  }
}

export const predefinedThemes: ColorTheme[] = [
  {
    id: "neon-green",
    name: "Neon Green",
    colors: {
      background: "#020202", // Deep black for high contrast
      foreground: "#d0ffd6", // Soft greenish-white for readability
      primary: "#39ff14", // Bright neon green
      secondary: "#062d06", // Darker green shade for depth
      accent: "#00cc44", // Medium neon green
      border: "#144d14", // Strong green border
      muted: "#093f09", // Muted deep green
      "muted-foreground": "#99e6a5", // Softer green for muted text
    },
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    colors: {
      background: "#0c061a", // Deep violet for a futuristic feel
      foreground: "#f5f7fa", // Off-white for better contrast
      primary: "#ff007f", // Hot neon pink
      secondary: "#140029", // Deep purple for aesthetics
      accent: "#00eaff", // Bright neon cyan for contrast
      border: "#2a004b", // Purple tone border
      muted: "#190035", // Dark muted purple
      "muted-foreground": "#c3b4ff", // Soft lavender for readability
    },
  },
  {
    id: "matrix",
    name: "Matrix",
    colors: {
      background: "#010b02", // Dark greenish black
      foreground: "#d4ffde", // Soft greenish-white
      primary: "#00ff41", // Classic Matrix green
      secondary: "#003b00", // Darker green
      accent: "#00cc55", // Brighter green variation
      border: "#005500", // Stronger green border
      muted: "#002200", // Muted deep green
      "muted-foreground": "#99ffb3", // Light green for secondary text
    },
  },
  {
    id: "synthwave",
    name: "Synthwave",
    colors: {
      background: "#1a0026", // Deep purple for retro vibes
      foreground: "#f8eaff", // Soft pastel pink-white
      primary: "#ff44cc", // Bright pink
      secondary: "#240054", // Deep purple
      accent: "#08e8de", // Neon cyan
      border: "#440080", // Purple neon border
      muted: "#2a005b", // Darker muted purple
      "muted-foreground": "#ffbbff", // Soft pink for secondary text
    },
  },
  {
    id: "amber-terminal",
    name: "Amber Terminal",
    colors: {
      background: "#1a0a00", // Very dark brown-black
      foreground: "#ffcc66", // Warm amber text
      primary: "#ff9900", // Bright orange
      secondary: "#331a00", // Deep brown-orange
      accent: "#ffaa33", // Vibrant amber
      border: "#663300", // Strong border
      muted: "#4d2600", // Muted brown-orange
      "muted-foreground": "#ffbf80", // Softer amber text
    },
  },
  {
    id: "midnight-blue",
    name: "Midnight Blue",
    colors: {
      background: "#020a18", // Deep navy blue
      foreground: "#cfe3ff", // Light blueish white
      primary: "#3ea7ff", // Sky blue
      secondary: "#081e3a", // Darker blue
      accent: "#60a5fa", // Bright blue
      border: "#0f1b2d", // Border for contrast
      muted: "#112d5a", // Muted dark blue
      "muted-foreground": "#a8c3e6", // Softer blue for secondary text
    },
  },
]

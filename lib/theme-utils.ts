export const themes = [
  {
    name: "dark",
    label: "Dark",
    color: "#222",
  },
  {
    name: "light",
    label: "Light",
    color: "#fff",
  },
  {
    name: "system",
    label: "System",
    color: "#ddd",
  },
]

export const initializeTheme = () => {
  const savedTheme = localStorage.getItem("arAIse-theme") || "dark"
  applyTheme(savedTheme)
}

export const applyTheme = (themeName: string) => {
  localStorage.setItem("arAIse-theme", themeName)
  document.documentElement.className = themeName
}

export const getCurrentTheme = () => {
  return localStorage.getItem("arAIse-theme") || "dark"
}


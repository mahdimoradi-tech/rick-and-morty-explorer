# 🌌 Rick and Morty Explorer

A professional, feature-rich React application that interacts with the official Rick and Morty API. It allows users to search for characters, view detailed information including their episode appearances, and manage a personalized list of favorite characters.

## 🔗 Live Demo
**[View Live Application](https://rick-and-morty-explorer-delta.vercel.app/)**

## ✨ Key Features
- **Live Search:** Real-time character search by name directly from the API.
- **Detailed Character Profiles:** View comprehensive data including status, species, gender, last known location, and origin.
- **Episodes Tracking:** Expandable accordion displaying all episodes a character appeared in, with chronological sorting capabilities.
- **Favorites Management:** Add or remove characters from a favorites list accessible via a custom-built Modal.
- **Data Persistence:** Favorites are securely saved in the browser's `localStorage` using a custom React hook, ensuring data survives page reloads.
- **Advanced Error Handling:** Graceful API error catching and request cancellation (AbortController) paired with elegant Toast notifications.
- **Custom UI Components:** Built from scratch including Modals, Accordions, and custom loading indicators without relying on heavy UI frameworks.

## 🛠️ Tech Stack & Architecture
- **Framework:** React 19 (Vite)
- **Data Fetching:** Axios (with AbortController for cleanup)
- **State Management:** Custom Hooks (`useCharacters`, `useLocalStorage`)
- **Styling:** Pure CSS with CSS Custom Properties (Variables)
- **Icons:** `@heroicons/react`
- **Notifications:** `react-hot-toast`
- **Loaders:** `react-loading-indicators`

## 🚀 Run Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR-USERNAME/rick-and-morty-explorer.git](https://github.com/YOUR-USERNAME/rick-and-morty-explorer.git)
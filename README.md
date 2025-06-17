# 📝 React Todo App (Vite + Tailwind + ShadCN)

A modern, feature-complete Todo app built with **React 19+, Vite, Tailwind CSS**, and **ShadCN/UI**.  
It demonstrates robust API integration, responsive design, offline support with IndexedDB, and accessible UI practices.

---

## 🚀 Features

- ✅ View todos with client-side pagination (10 per page)
- 🔍 Search by title
- 🎯 Filter by completion status (All / Completed / Incomplete)
- ➕ Add new todos via modal
- ✏️ Edit existing todos inline via modal
- ❌ Delete todos with confirmation
- 🧭 Routing with React Router v7
- 📄 View individual todo detail on nested route (`/todos/:id`)
- 🔐 Error boundary for crash handling
- 🔄 Offline caching and local persistence via IndexedDB (Dexie.js)
- 📦 Responsive, mobile-friendly, and accessible UI
- 🎨 Tailwind-based styling with ShadCN headless components

---

## 🧱 Tech Stack

| Technology           | Purpose                                  |
|----------------------|------------------------------------------|
| React 19+            | UI and state management                  |
| Vite                 | Lightning-fast dev server and build tool |
| Tailwind CSS         | Utility-first CSS styling                |
| ShadCN/UI            | Accessible modal, button, and form UI    |
| React Router v7      | Routing and navigation                   |
| React Hook Form      | Form handling and validation             |
| Dexie.js             | IndexedDB wrapper for offline caching    |
| JSONPlaceholder API  | Mock backend for todos                   |

---

## 📁 Folder Structure

src/
├── components/ # Shared UI components (modals, buttons, error boundary)
├── pages/ # Page components (Home, Detail, NotFound)
├── features/todos/ # Todo logic (hooks, queries, mutations)
├── db/ # Dexie.js setup
├── App.jsx # Routing setup
├── main.jsx # Entry point
└── index.css # Tailwind CSS styles

"# TodoApp" 

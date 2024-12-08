Here’s a detailed set of instructions for your frontend developer to follow, ensuring the program logic and UI remain consistent while allowing you to later integrate the backend and admin panel.

---

### **Frontend Developer Instructions**

#### **Project Setup**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the frontend directory:
   ```bash
   cd blockchain-voting-system/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

#### **Development Guidelines**

##### **File Structure**

Ensure the following structure is maintained:

```
frontend/
├── src/
│   ├── pages/            // All page components (HomePage, AdminPage, UserPage)
│   ├── components/       // Reusable UI components (e.g., Navbar, Footer, etc.)
│   ├── context/          // Context API files (e.g., AuthContext for managing login state)
│   ├── App.jsx           // Entry point for React app, defines routes
│   ├── main.jsx          // ReactDOM.render and other setup
│   ├── index.css         // Global Tailwind CSS imports
```

##### **Page Logic**

1. **HomePage (`src/pages/HomePage.jsx`)**:

   - Display two buttons:
     - **Admin Login**: Navigate to `/admin`.
     - **User Login**: Navigate to `/user`.
   - Use Tailwind for styling to ensure a modern, responsive design.

2. **AdminPage (`src/pages/AdminPage.jsx`)**:

   - Placeholder UI for admin functionalities:
     - Section to add a new election (form UI).
     - Section to view current elections and results (dynamic data display using cards or tables).
   - Use dummy data for now, with the option to replace it with backend API calls later.

3. **UserPage (`src/pages/UserPage.jsx`)**:
   - Placeholder UI for:
     - Viewing **Current Elections**: List of elections with an option to vote.
     - Viewing **Resulted Elections**: Display completed elections with a bar chart for vote distribution.
   - Use mock election and candidate data for now.

---

##### **Reusable Components**

1. **Navbar (`src/components/Navbar.jsx`)**:
   - Include links for navigation (Home, Admin, User).
   - Highlight the active page.
2. **Chart Component (`src/components/Chart.jsx`)**:
   - Use a library like [Chart.js](https://www.chartjs.org/) or [Recharts](https://recharts.org/).
   - Render a dynamic bar or pie chart showing vote percentages.

---

##### **State Management**

1. Use Context API (`src/context/AuthContext.js`) to manage login state:

   - Admin and user roles.
   - Use `isAuthenticated` and `userRole` flags.

   Example:

   ```javascript
   import React, { createContext, useState, useContext } from "react";

   const AuthContext = createContext();

   export const useAuth = () => useContext(AuthContext);

   export const AuthProvider = ({ children }) => {
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [userRole, setUserRole] = useState("user"); // "user" or "admin"

     return (
       <AuthContext.Provider
         value={{ isAuthenticated, userRole, setIsAuthenticated, setUserRole }}
       >
         {children}
       </AuthContext.Provider>
     );
   };
   ```

2. Wrap `App.jsx` in `AuthProvider`:

   ```jsx
   import { AuthProvider } from "./context/AuthContext";

   const App = () => {
     return (
       <AuthProvider>
         <Router>
           <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/admin" element={<AdminPage />} />
             <Route path="/user" element={<UserPage />} />
           </Routes>
         </Router>
       </AuthProvider>
     );
   };
   ```

---

#### **API Integration Placeholder**

1. Use `axios` to mock API calls for now:

   - Example API structure:

     ```javascript
     const API = "http://localhost:5000/api";

     export const getElections = async () => {
       // Placeholder mock response
       return [
         { id: 1, name: "Election 1", candidates: [] },
         { id: 2, name: "Election 2", candidates: [] },
       ];
     };

     export const loginUser = async (username, password) => {
       return { success: true, role: "user" }; // Mock response
     };
     ```

   ```

   ```

2. Replace mock APIs with real endpoints later.

---

#### **Design Rules**

1. Use **Tailwind CSS** for consistent and responsive UI design.

   - Example for buttons:
     ```html
     <button
       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
     >
       Click Me
     </button>
     ```

2. Use grids and flexbox for layouts.

---

#### **Development Notes**

1. **Dynamic Charts**:

   - Implement placeholders for now with dummy data.
   - Use props to dynamically update charts:
     ```jsx
     const Chart = ({ data }) => {
       // Render a chart based on `data`
     };
     ```

2. **Admin Login**:

   - Show a basic login form on `/admin`.
   - Use `AuthContext` to set admin privileges on login.

3. **Testing Routes**:

   - Ensure the navigation flow works:
     - `/` → `AdminPage` or `UserPage` based on role.
     - Restrict `/admin` for non-admins using `AuthContext`.

4. **Future Integration**:
   - Ensure all pages and components use modular data structures so backend APIs can be plugged in later without breaking the logic.

---

#### **Delivery Instructions**

1. Commit and push your changes to the repository frequently.
2. Maintain clean and modular code.
3. Use comments to explain key logic.

---

With these instructions, the frontend developer will have clear guidelines to build a stable UI and logic layer, making backend integration seamless. Let me know if you need additional specifics!

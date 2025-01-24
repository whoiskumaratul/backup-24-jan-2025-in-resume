import { useAuth } from "../accounts/AuthContext";
export const TestComponent = () => {
    const { isAuthenticated, user, login, logout } = useAuth();
  
    return (
      <div>
        <p>Is Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
        <p>User: {user?.name || "None"}</p>
        <button onClick={() => login({ name: "John Doe" })}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };
  
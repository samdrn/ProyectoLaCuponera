import RoleContextProvider from "./context/RoleContext";
import AppRouter from "./routes/AppRouter";
function App() {
  return (
    <RoleContextProvider>
      <AppRouter />
    </RoleContextProvider>
  );
}

export default App;

import AppRouter from "./router";
import Store from "@/model/global";

function App() {
  return (
    <Store.Provider>
      <AppRouter />
    </Store.Provider>
  );
}

export default App;

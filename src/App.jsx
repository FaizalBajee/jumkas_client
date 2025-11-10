import routes from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme as antdTheme } from "antd";


function App() {
  return <RouterProvider router={routes} />;
}

export default App;

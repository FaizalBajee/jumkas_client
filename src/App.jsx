import routes from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme as antdTheme } from "antd";
import { FloatButton } from "antd";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <FloatButton.BackTop />
    </>
  );
}

export default App;

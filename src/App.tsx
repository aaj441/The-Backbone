import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
/* Thius is fine: https://github.com/hannoeru/vite-plugin-pages/issues/120 */
/** @ts-expect-error - vite-plugin-pages generates routes dynamically */
import routes from "~react-pages";

function App() {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
}

export default App;

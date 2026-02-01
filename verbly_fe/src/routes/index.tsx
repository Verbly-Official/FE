import { createBrowserRouter } from "react-router-dom";
import { correctionRoutes } from "./correction";

// (선택) 404 페이지 추가
const NotFound = () => <div style={{ padding: 24 }}>404 - Not Found</div>;

export const router = createBrowserRouter([...correctionRoutes, { path: "*", element: <NotFound /> }]);

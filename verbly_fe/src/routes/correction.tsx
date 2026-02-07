import type { RouteObject } from "react-router-dom";
import Correction_Main from "../pages/Correction/CorrectionMainPage";
import Correction_Write from "../pages/Correction/WriteCorrectionPage";
import Correction_NMain from "../pages/Correction/Native/CorrectionMainNativePage";
import Correction_NList from "../pages/Correction/Native/CorrectionListNativePage";
import Correction_Templete from "../pages/Correction/WriteTemplate";
import CorrectionWriteLayout from "../pages/Correction/CorrectionWriteLayout";

export const correctionRoutes: RouteObject[] = [
  { path: "/", element: <Correction_Main /> },

  { path: "correction", element: <Correction_Main /> },

  {
    path: "correction/write",
    element: <CorrectionWriteLayout />,
    children: [
      { index: true, element: <Correction_Write /> }, // /correction/write
      { path: "template", element: <Correction_Templete /> }, // /correction/write/template
    ],
  },

  { path: "correction/native", element: <Correction_NMain /> },
  { path: "correction/native/list", element: <Correction_NList /> },
];

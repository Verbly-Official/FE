import type { RouteObject } from "react-router-dom";
import CorrectionMainLayout from "../pages/Correction/layout/CorrectionMainLayout";
import CorrectionWriteLayout from "../pages/Correction/layout/CorrectionWriteLayout";

import Correction_Main from "../pages/Correction/korean/CorrectionMainPage";
import Correction_Drafts from "../pages/Correction/korean/CorrectionDrafts";
import Correction_Write from "../pages/Correction/korean/WriteCorrectionPage";

import Correction_NMain from "../pages/Correction/Native/CorrectionMainNativePage";
import Correction_NList from "../pages/Correction/Native/CorrectionListNativePage";

import CorrectionKoLayout from "../pages/Correction/layout/CorrectionKoLayout";
import CorrectionNativeLayout from "../pages/Correction/layout/CorrectionEnLayout";
import CorrectionRedirectPage from "../pages/Correction/CorrectionRedirect";
import CorrectionListPage from "../pages/Correction/korean/CorrectionList";

export const correctionRoutes: RouteObject[] = [
  {
    path: "correction",
    element: <CorrectionMainLayout />,
    children: [
      /* ===== KO (사이드바 있는 구간) ===== */
      {
        element: <CorrectionKoLayout />,
        children: [
          { path: "ko", element: <Correction_Main /> },
          { path: "draft", element: <Correction_Drafts /> },
          { index: true, element: <CorrectionRedirectPage /> },
        ],
      },

      { path: "list/:correctionId", element: <CorrectionListPage /> },

      /* ===== NATIVE ===== */
      {
        path: "native",
        element: <CorrectionNativeLayout />,
        children: [
          { index: true, element: <Correction_NMain /> },
          { path: "list", element: <Correction_NList /> },
          { path: "list/:correctionId", element: <Correction_NList /> },
        ],
      },
    ],
  },

  {
    path: "correction/write",
    element: <CorrectionWriteLayout />,
    children: [{ index: true, element: <Correction_Write /> }],
  },
];

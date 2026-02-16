import type { RouteObject } from "react-router-dom";
import CorrectionMainLayout from "../pages/Correction/layout/CorrectionMainLayout";
import CorrectionWriteLayout from "../pages/Correction/layout/CorrectionWriteLayout";

import Correction_Main from "../pages/Correction/korean/CorrectionMainPage";
import Correction_Drafts from "../pages/Correction/korean/CorrectionDrafts";
import Correction_ReadOnly from "../pages/Correction/korean/CorrectionReadOnly";

import Correction_Write from "../pages/Correction/korean/WriteCorrectionPage";

import Correction_NMain from "../pages/Correction/native/CorrectionMainNativePage";
import Correction_NList from "../pages/Correction/native/CorrectionListNativePage";

import CorrectionKoLayout from "../pages/Correction/layout/CorrectionKoLayout";
import CorrectionNativeLayout from "../pages/Correction/layout/CorrectionEnLayout";
import CorrectionRedirectPage from "../pages/Correction/CorrectionRedirect";

export const correctionRoutes: RouteObject[] = [
  {
    path: "correction",
    element: <CorrectionMainLayout />,
    children: [
      /* ===== KO ===== */
      {
        element: <CorrectionKoLayout />,
        children: [
          { path: "ko", element: <Correction_Main /> }, // /correction/ko
          { path: "draft", element: <Correction_Drafts /> }, // /correction/draft
          { index: true, element: <CorrectionRedirectPage /> }, // /correction -> redirect
          { path: "list/:correctionId", element: <Correction_ReadOnly /> },
        ],
      },

      /* ===== NATIVE ===== */
      {
        path: "native",
        element: <CorrectionNativeLayout />,
        children: [
          { index: true, element: <Correction_NMain /> }, // /correction/native
          { path: "list", element: <Correction_NList /> }, // /correction/native/list
          { path: "list/:correctionId", element: <Correction_NList /> }, // /correction/native/list/123
        ],
      },
    ],
  },

  /* ===== WRITE ===== */
  {
    path: "correction/write",
    element: <CorrectionWriteLayout />,
    children: [{ index: true, element: <Correction_Write /> }],
  },
];

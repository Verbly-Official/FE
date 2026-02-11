import type { RouteObject } from "react-router-dom";
import CorrectionMainLayout from "../pages/Correction/layout/CorrectionMainLayout";
import CorrectionWriteLayout from "../pages/Correction/layout/CorrectionWriteLayout";

import Correction_Main from "../pages/Correction/CorrectionMainPage";
import Correction_Drafts from "../pages/Correction/CorrectionDrafts";

import Correction_Write from "../pages/Correction/WriteCorrectionPage";

import Correction_NMain from "../pages/Correction/Native/CorrectionMainNativePage";
import Correction_NList from "../pages/Correction/Native/CorrectionListNativePage";

import CorrectionKoLayout from "../pages/Correction/layout/CorrectionKoLayout";
import CorrectionNativeLayout from "../pages/Correction/layout/CorrectionEnLayout";

export const correctionRoutes: RouteObject[] = [
  {
    path: "correction",
    element: <CorrectionMainLayout />,
    children: [
      /* ===== KO ===== */
      {
        element: <CorrectionKoLayout />,
        children: [
          { index: true, element: <Correction_Main /> }, // /correction
          { path: "draft", element: <Correction_Drafts /> }, // /correction/draft
        ],
      },

      /* ===== NATIVE ===== */
      {
        path: "native",
        element: <CorrectionNativeLayout />,
        children: [
          { index: true, element: <Correction_NMain /> }, // /correction/native
        ],
      },

      { path: "native/list", element: <Correction_NList /> },
    ],
  },

  /* ===== WRITE ===== */
  {
    path: "correction/write",
    element: <CorrectionWriteLayout />,
    children: [{ index: true, element: <Correction_Write /> }],
  },
];

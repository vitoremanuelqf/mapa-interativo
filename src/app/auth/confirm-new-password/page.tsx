import { Suspense } from "react";

import { ConfirmNewPasswordForm } from "./confirm-new-password-form";

export default function ConfirmNewPassword() {
  return (
    <div className="w-full h-full min-h-dvh p-4 flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <ConfirmNewPasswordForm />
      </Suspense>
    </div>
  );
}

import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Thay đổi dòng này để linh hoạt hơn
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || window.location.origin,
  plugins: [organizationClient()],
});

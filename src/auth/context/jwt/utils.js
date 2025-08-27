import authAxios from "src/lib/auth-axios";
import lendingAxios from "src/lib/lending-axios";
import paymentAxios from "src/lib/payment-axios";
import adminOpsAxios from "src/lib/adminOps-axios";
import analyticsAxios from "src/lib/analytics-axios";
import catalogInventoryAxios from "src/lib/catalogInventory-axios";
import reviewEngagementAxios from "src/lib/reviewEngagement-axios";

import { JWT_STORAGE_KEY } from "./constant";

export function jwtDecode(token) {
  try {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length < 2) {
      throw new Error("Invalid token!");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error;
  }
}

export function isValidToken(accessToken) {
  if (!accessToken) {
    return false;
  }

  try {
    return jwtDecode(accessToken);
  } catch (error) {
    console.error("Error during token validation:", error);
    return false;
  }
}

export async function setSession(accessToken) {
  try {
    if (accessToken) {
      sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);

      catalogInventoryAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      lendingAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      reviewEngagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      paymentAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      analyticsAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      adminOpsAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      authAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      const decodedToken = jwtDecode(accessToken);

      if (!decodedToken) {
        throw new Error("Invalid access token!");
      }
      return decodedToken;
    } else {
      sessionStorage.removeItem(JWT_STORAGE_KEY);

      delete catalogInventoryAxios.defaults.headers.common.Authorization;

      delete lendingAxios.defaults.headers.common.Authorization;

      delete reviewEngagementAxios.defaults.headers.common.Authorization;

      delete paymentAxios.defaults.headers.common.Authorization;

      delete analyticsAxios.defaults.headers.common.Authorization;

      delete adminOpsAxios.defaults.headers.common.Authorization;

      delete authAxios.defaults.headers.common.Authorization;

      return null;
    }
  } catch (error) {
    console.error("Error during set session:", error);
    throw error;
  }
}

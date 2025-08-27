import { paths } from "src/routes/paths";

export const CONFIG = {
  appName: "Smart Library Management System",
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? "",

  catalogInventoryServiceUrl:
    import.meta.env.VITE_CATALOGINVENTORY_SERVICE_URL ?? "",

  lendingServiceUrl: import.meta.env.VITE_LENDING_SERVICE_URL ?? "",

  reviewEngagementServiceUrl:
    import.meta.env.VITE_REVIEWENGAGEMENT_SERVICE_URL ?? "",

  paymentServiceUrl: import.meta.env.VITE_PAYMENT_SERVICE_URL ?? "",

  analyticsServiceUrl: import.meta.env.VITE_ANALYTICS_SERVICE_URL ?? "",

  adminOpsServiceUrl: import.meta.env.VITE_ADMINOPS_SERVICE_URL ?? "",

  authServiceUrl: import.meta.env.VITE_AUTH_SERVICE_URL ?? "",

  auth: {
    skip: false,
    redirectPath: paths.dashboard.root,
  },
};

export { default } from "next-auth/middleware";

// Only protect the dashboard and agent-control routes
export const config = { matcher: ["/dashboard/:path*", "/control/:path*"] };
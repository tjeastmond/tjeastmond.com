import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route(":chapterId", "routes/chapter.tsx")] satisfies RouteConfig;

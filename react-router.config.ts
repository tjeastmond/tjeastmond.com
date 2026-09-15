import type { Config } from "@react-router/dev/config";
import { PRERENDER_PATHS } from "./src/components/novel/indexData";

export default {
  appDirectory: "app",
  ssr: false,
  prerender: PRERENDER_PATHS,
} satisfies Config;

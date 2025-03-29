import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost" + process.env.NEXT_PUBLIC_PORT,
    supportFile: "cypress/support/e2e.ts",
  },
})

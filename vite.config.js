import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { writeFileSync } from 'node:fs'
import { projectsData } from './src/Utils/ProjectsData.js'

const SITE_URL = 'https://usmanibraheem.com'

const routePaths = ['/', ...projectsData.map((project) => `/projects/${project.slug}`)]

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    dirStyle: 'nested',
    includedRoutes(paths) {
      return [
        ...paths.filter((path) => !path.includes(':')),
        ...projectsData.map((project) => `/projects/${project.slug}`),
      ]
    },
    onFinished() {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routePaths.map((path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
  </url>`).join('\n')}
</urlset>
`
      writeFileSync('dist/sitemap.xml', sitemap)

      const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
      writeFileSync('dist/robots.txt', robots)
    },
  },
})

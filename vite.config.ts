import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { handleSendEmail } from './server/emailHandler.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const emailApiPlugin = {
    name: 'email-api-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/send-email' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: any) => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}')
              const result = await handleSendEmail(data, env)
              res.statusCode = result.statusCode
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(result.data))
            } catch (err: any) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message || 'Error interno al procesar el correo.' }))
            }
          })
          return
        }
        next()
      })
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/send-email' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: any) => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}')
              const result = await handleSendEmail(data, env)
              res.statusCode = result.statusCode
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(result.data))
            } catch (err: any) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message || 'Error interno al procesar el correo.' }))
            }
          })
          return
        }
        next()
      })
    }
  }

  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
      emailApiPlugin,
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },

    server: {
      proxy: {
        '/wp-json': {
          target: 'https://www.agrofert.com.co',
          changeOrigin: true,
          secure: false,
        }
      }
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
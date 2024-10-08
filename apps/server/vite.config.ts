import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig(({ command, mode }) => {
  const isProductionBuild = () => command === 'build' && mode === 'production'

  return {
    build: {
      ssr: true,
      target: 'node20',
      outDir: 'dist',
      rollupOptions: {
        input: 'src/index.ts',
      },
    },
    ssr: {
      target: 'node',
      noExternal: isProductionBuild() ? true : undefined,
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: './node_modules/swagger-ui-dist/swagger-ui.css',
            dest: '.',
          },
          {
            src: './node_modules/swagger-ui-dist/favicon-16x16.png',
            dest: '.',
          },
          {
            src: './node_modules/swagger-ui-dist/favicon-32x32.png',
            dest: '.',
          },
          {
            src: './node_modules/swagger-ui-dist/swagger-ui-bundle.js',
            dest: '.',
          },
          {
            src: './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
            dest: '.',
          },
        ],
      }),
    ],
    test: {
      include: ['src/**/*.test.ts'],
      coverage: {
        reporter: ['lcov', 'text'],
      },
    },
  }
})

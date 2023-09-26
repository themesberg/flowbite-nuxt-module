import { defineNuxtModule, addComponent, createResolver, installModule } from '@nuxt/kit'

interface ComponentGroup {
  chunkName: string
  exports: string[]
}

const flowbiteComponents: ComponentGroup[] = [
  {
    chunkName: 'flowbite/button',
    exports: [
      'Button', 'ButtonGroup', 'Badge',
    ],
  },
  {
    chunkName: 'flowbite/accordion',
    exports: [
      'Accordion', 'AccordionPanel', 'AccordionHeader', 'AccordionContent',
    ],
  },
  {
    chunkName: 'flowbite/flying',
    exports: [
      'Alert', 'Modal', 'Tooltip', 'Toast',
    ],
  },
  {
    chunkName: 'flowbite/navbar',
    exports: [
      'Navbar', 'NavbarLogo', 'NavbarCollapse', 'NavbarLink',
    ],
  },
  {
    chunkName: 'flowbite/form',
    exports: [
      'Input', 'FileInput', 'Checkbox', 'Select', 'Toggle', 'Textarea', 'Range', 'Dropdown', 'Radio', 'Progress',
    ],
  },
  {
    chunkName: 'flowbite/timeline',
    exports: [
      'Timeline', 'TimelineItem', 'TimelinePoint', 'TimelineTime', 'TimelineContent', 'TimelineTitle',
    ],
  },

  {
    chunkName: 'flowbite/table',
    exports: [
      'Table', 'TableHead', 'TableBody', 'TableHeadCell', 'TableRow', 'TableCell',
    ],
  },

  {
    chunkName: 'flowbite/listGroup',
    exports: [
      'ListGroup', 'ListGroupItem',
    ],
  },

  {
    chunkName: 'flowbite/tab',
    exports: [
      'Tabs', 'Tab',
    ],
  },

  {
    chunkName: 'flowbite/carousel',
    exports: [
      'Carousel',
    ],
  },

  {
    chunkName: 'flowbite/breadcrumb',
    exports: [
      'Breadcrumb',
    ],
  },

  {
    chunkName: 'flowbite/spinner',
    exports: [
      'Spinner',
    ],
  },

  {
    chunkName: 'flowbite/avatar',
    exports: [
      'Avatar',
    ],
  },

  {
    chunkName: 'flowbite/pagination',
    exports: [
      'Pagination',
    ],
  },

  {
    chunkName: 'flowbite/theme',
    exports: [
      'FlowbiteThemable',
    ],
  },

]

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * @default false
   */
  global?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-flowbite',
    configKey: 'flowbite',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: true,
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    nuxt.hook('tailwindcss:config', function (tailwindConfig) {
      tailwindConfig.plugins = tailwindConfig.plugins || []
    })

    await installModule('@nuxtjs/tailwindcss', {
      // module configuration
      exposeConfig: true,
      config: {
        darkMode: 'class',
        content: {
          files: [
            resolve('node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}'),
            resolve('node_modules/flowbite/**/*.{js,jsx,ts,tsx}')
          ]
        },
        plugins: [
          require('flowbite/plugin')
        ]
      }
    })
    for (const group of flowbiteComponents) {
      for (const e of group.exports) {
        await addComponent(
          {
            name: e,
            export: e,
            filePath: 'flowbite-vue',
            chunkName: group.chunkName,
            global: options.global,
          },
        )
      }
    }
  },
})

# Setup React/shadcn 

### Create Vue Project
From the root folder, create vite-based project:
```bash
npm create vite@latest
```

Prompts
-	Project name: player-card
-	Framework: Vue
-	Variant: TypeScript

```bash
cd shadcn-vue
npm install
```

### Install Tailwind CSS
```bash
npm install tailwindcss @tailwindcss/vite
```

### Configure Config for Tailwind
- Create file src/index.css with this at top:
	@import "tailwindcss";

- Remove the default file src/style.css and edit the file src/main.ts
  to import "./index.css" instead of "./style.css".

- Edit tsconfig.json to set compiler options:
	"compilerOptions": {
	  "baseUrl": ".",
	  "paths": {
	    "@/*": ["./src/*"]
	  }
	}

- Edit tsconfig.app.json to include compiler options:
	"baseUrl": ".",
	"paths": {
		"@/*": ["./src/*"]
	},

- Edit vite.config.ts to include Tailwind CSS:
	import tailwindcss from '@tailwindcss/vite';
	import path from 'path';

	export default defineConfig({
  	plugins: [vue(), tailwindcss()],
  	resolve: {
    	alias: {
      	"@": path.resolve(__dirname, "./src")
    	}
  	}
	})

### Install Shadcn
```bash
npx shadcn-vue@latest init
```

Prompt:
-	Base color: Neutral

Install some shadcn components:
```bash
npx shadcn-vue@latest add button input label
npx shadcn-vue@latest add combobox
```

### Code changes
- Edit src/stylecss to remove all content
- Edit src/main.ts to refer src/index.css instead of src/styles.css
- Edit HelloWorld.vue:
	import { Button } from '@/components/ui/button'

### Run the project
```bash
npm run dev
```

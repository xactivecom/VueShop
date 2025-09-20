# TypeScript Demo
Example based on content from the Vue Mastery course "Intro to Vue 3 + TypeScript".
The courses use the Vue Composition API syntax with TypeScript.

https://www.vuemastery.com/courses/vue3-typescript

The source code repo with all branches is:

https://github.com/Code-Pop/Real-World-Vue-3-TypeScript.git


### Create Project
Instead of following the slightly outdated course, the approach was to use better Vite tooling
to create the project. The result is that some project config files do not match the source repo.

From the root folder, create vite-based project:
```bash
npm create vite@latest
```

Prompts
-	Project name: vue-typescript
-	Framework: Vue
-	Variant: TypeScript

```bash
cd vue-typescript
npm install
```

### Vite Notes
This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

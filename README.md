# Roadwatch

The Roadwatch project aims to revolutionize how communities interact with and
navigate their local road systems by providing a combined platform for
reporting road conditions, alerting users to hazards, allowing community input,
and influencing road infrastructure improvements.

# MonoRepo Setup

This project will become a monorepo just so development on backend and frontend is easy.
All you need to do is go to root and npm i. This will install and configure everything for both sides.
You can run npm run dev-client from root to start the react project.
,,,
If you need to run other commands and don't want to cd into the respective folders you can run:
npm i <package> -w server/client
-w stands for workspace and specifying one will install the package there. This is from root, if you cd into a folder you don't need to do this.

These 2 folders will have their own package and package locks that they manage. Root package will not manage anything except just stating that 2 workspaces exist.
I could make it so that they share packages and have 1 eslint config but that gets complicated.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

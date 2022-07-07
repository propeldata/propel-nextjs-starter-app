/**
 * Note: This repo requires ESLint to be run after Prettier.
 * (The reason we need to run ESLint 2nd is the space-before-func-parens rule.)
 * To do so in VS Code, you need to use an extra extension.
 *
 * Reference: https://github.com/rohit-gohri/vscode-format-code-action
 *
 * Step 1: Make sure you've installed the VS Code Prettier & ESLint extensions:
 *    https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
 *    https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
 * Step 2: On the command line, install the extra extension:
 *         code --install-extension rohit-gohri.format-code-action
 * Step 3: Use either File -> Open Workspace from File... or the command line:
 *         code sample-app-nextjs.code-workspace
 * Step 4: You should now be set up correctly using the local workspace file.
 */

module.exports = {
  semi: false, // Don't use semicolons
  singleQuote: true, // Use single quotes instead of double quotes
  trailingComma: 'none' // Never use trailing commas
}

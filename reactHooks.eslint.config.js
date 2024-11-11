import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  plugins: { 'react-refresh': reactHooks },
  rules: reactHooks.configs.recommended.rules,
});
export default function (plop) {
  plop.setGenerator('Component', {
    description: 'A bare bones Component',
    prompts: [{
      type: 'input',
      name: 'componentName',
      message: 'Component Name',
    }],
    actions: [{
      type: 'add',
      path: 'components/{{pascalCase componentName}}.tsx',
      templateFile: '_plop-templates/component.tsx.hbs',
    }],
  });
}

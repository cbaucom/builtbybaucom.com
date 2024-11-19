import { visit } from 'unist-util-visit';

export function remarkYoutube() {
  return (tree: any) => {
    visit(tree, 'inlineCode', (node) => {
      const { value } = node;
      const match = value.match(/^youtube:\s*(.+)$/);

      if (match) {
        const id = match[1];
        node.type = 'jsx';
        node.value = `<YouTube id="${id}" />`;
      }
    });
  };
}

const Markdoc = require('@markdoc/markdoc');

import Markdoc from '@markdoc/markdoc';

const doc = `
# Markdoc README

{% image src="/logo.svg" /%}
`;

const ast = Markdoc.parse(doc);
const content = Markdoc.transform(ast);
return Markdoc.renderers.react(content, React);

const source = '# Markdoc';

const ast = Markdoc.parse(source);
const content = Markdoc.transform(ast, /* config */);

const html = Markdoc.renderers.html(content);

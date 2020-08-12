import * as paths from 'path';
import moduleAlias from 'module-alias';

const files = paths.resolve(__dirname, '../..');
console.log({ files });
moduleAlias.addAliases({
  '@src': paths.join(files, 'src'),
});

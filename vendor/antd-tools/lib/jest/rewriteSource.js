function rewriteSource(t, path, libDir) {
  if (libDir === 'dist') {
    const matches = path.node.source.value.match(new RegExp('^@allenai/varnish$'));
    if (matches) {
      path.node.source.value = `../../../dist/antd.js`;
    }
  }
}

module.exports = rewriteSource;

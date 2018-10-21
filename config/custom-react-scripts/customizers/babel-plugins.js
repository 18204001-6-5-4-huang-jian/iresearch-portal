module.exports = {
  DECORATORS: {
    get: () => require.resolve('babel-plugin-transform-decorators-legacy'),
  },
  ANTD: {
    get: () => ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]
  }
};

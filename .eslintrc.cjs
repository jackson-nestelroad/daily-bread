module.exports = {
  extends: ['./eslint/typescript'].map(require.resolve),
  ignorePatterns: ['build'],
};

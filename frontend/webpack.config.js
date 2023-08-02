const path = require('path');

module.exports = {
  entry: './app',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  
};
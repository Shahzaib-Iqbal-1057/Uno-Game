/** @type {import('next').NextConfig} */
const nextConfig = {
    module: {
      rules: [
        {
          test: /\.(css|sass)$/i,
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('tailwindcss'),
                ],
              },
            },
          ],
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  
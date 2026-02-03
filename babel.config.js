module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@services': './src/services',
          '@providers': './src/providers',
          '@hooks': './src/hooks',
          '@api': './src/api',
          '@store': './src/store',
          '@types': './src/types',
        },
      },
    ],
  ],
};

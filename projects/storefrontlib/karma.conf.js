// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: false,
      },
    },
    reporters: ['progress', 'kjhtml', 'coverage-istanbul', 'dots'],
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage/storefront'),
      reports: ['lcov', 'cobertura', 'text-summary'],
      thresholds: {
        statements: 80,
        lines: 80,
        branches: 60,
        functions: 73,
      },
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--headless', '--no-sandbox', '--remote-debugging-port=9001'],
      },
    },
    singleRun: false,
  });
};

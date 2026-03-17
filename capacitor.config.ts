import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.honeypot.app',
  appName: 'HoneyPot',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

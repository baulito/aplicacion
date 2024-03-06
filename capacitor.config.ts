import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.baulito',
  appName: 'Baulito',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;

import * as dotenv from 'dotenv';

export class ConfigSetupService {
  constructor() {
    dotenv.config();
  }

  get(key: string): string {
    return process.env[key] as string;
  }
}

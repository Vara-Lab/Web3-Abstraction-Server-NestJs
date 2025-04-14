declare namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      jwtSecretKey: string;
      jwtRefreshTokenKey: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_SECRET: string;
      GOOGLE_CALLBACK_URL: string;
    }
  }
  
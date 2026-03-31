// Для подхватывания файла index.d.ts добавлен флаг --files в скрипты npm run start/dev.

declare namespace Express {
  export interface Request {
    user: {
      _id: string;
    };
  }
}

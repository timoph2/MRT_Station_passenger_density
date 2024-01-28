export class ObtainDataError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'obtainDataError';
    }
  }
  
export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
    }
  }
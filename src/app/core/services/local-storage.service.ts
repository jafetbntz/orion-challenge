import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

    set(key: string, value: any): void {
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    get(key: string): any {
      const value =  localStorage.getItem(key);
      if (!value) {
        return null;
      }

      return JSON.parse(value);
    }
  
    remove(key: string): void {
      localStorage.removeItem(key);
    }

    clear(): void {
      localStorage.clear();
    }
}

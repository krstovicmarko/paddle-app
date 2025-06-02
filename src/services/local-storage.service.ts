import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  exists(key: string): boolean {
    return localStorage.getItem(key) != undefined;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() : void {
    localStorage.clear();  
  }
}

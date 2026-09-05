import type {
  MiniMapUrlDetails,
  StatsResponse,
  SuccessfulResponse,
} from "../components/types";

class DataCache<T> {
  private cache = new Map<string, T>();

  private expiresAt: number | null = null;

  name: "tiles" | "stats";

  constructor(name: "tiles" | "stats") {
    this.name = name;
    this.loadFromLocalStorage();
  }

  private createKey(
    dataset: MiniMapUrlDetails["dataset"],
    year: number,
  ): string {
    return `${dataset}:${year}`;
  }

  set(
    dataset: MiniMapUrlDetails["dataset"],
    year: number,
    data: T,
    expiresIn: number,
  ): void {
    const key = this.createKey(dataset, year);

    this.cache.set(key, data);

    this.saveToLocalStorage();

    if (this.expiresAt === null) {
      this.expiresAt = Date.now() + expiresIn * 1000;
    }
  }

  get(dataset: MiniMapUrlDetails["dataset"], year: number): T | null {
    if (this.isExpired()) {
      this.clear();
      return null;
    }

    const key = this.createKey(dataset, year);

    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    return entry;
  }

  getAll(): T[] | null {
    if (this.isExpired()) {
      this.clear();
      return null;
    }

    return Array.from(this.cache.values());
  }

  has(dataset: MiniMapUrlDetails["dataset"], year: number): boolean {
    return this.get(dataset, year) !== null;
  }

  private isExpired(): boolean {
    if (this.expiresAt === null) {
      return true;
    }

    return Date.now() >= this.expiresAt;
  }

  private saveToLocalStorage(): void {
    const cacheData = Array.from(this.cache.entries());
    localStorage.setItem(`${this.name}DataCache`, JSON.stringify(cacheData));
  }

  private loadFromLocalStorage(): void {
    const cacheData = localStorage.getItem(`${this.name}DataCache`);
    if (cacheData) {
      const parsedData = JSON.parse(cacheData) as [string, T][];
      this.cache = new Map(parsedData);
    }
  }

  clear(): void {
    this.cache.clear();
    this.expiresAt = null;
    localStorage.removeItem(`${this.name}DataCache`);
  }
}

export const tileDataCache = new DataCache<SuccessfulResponse["data"]>("tiles");
export const statsDataCache = new DataCache<StatsResponse["data"]>("stats");

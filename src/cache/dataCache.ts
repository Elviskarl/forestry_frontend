import type {
  MiniMapUrlDetails,
  StatsResponse,
  SuccessfulResponse,
} from "../components/types";

class DataCache<T> {
  private cache = new Map<string, T>();

  private expiresAt: number | null = null;

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

  has(dataset: MiniMapUrlDetails["dataset"], year: number): boolean {
    return this.get(dataset, year) !== null;
  }

  private isExpired(): boolean {
    if (this.expiresAt === null) {
      return true;
    }

    return Date.now() >= this.expiresAt;
  }

  clear(): void {
    this.cache.clear();
    this.expiresAt = null;
  }
}

export const tileDataCache = new DataCache<SuccessfulResponse["data"]>();
export const statsDataCache = new DataCache<StatsResponse["data"]>();

class LocalService {
  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);

    if (data) {
      const parsedData: T = JSON.parse(data);
      return parsedData;
    }

    return null;
  }

  set(key: string, item: unknown) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  has(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

export default new LocalService();

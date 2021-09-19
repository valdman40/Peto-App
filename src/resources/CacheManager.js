import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-community/async-storage";

export const UserCache = {
  name: "user",
  types: {
    lastLoggedUser: "lastLoggedUser",
  },
};

export const SettingsCache = {
  name: "settings",
  types: {
    urlBase: "urlBase",
  },
};

export default class CacheManager {
  // here we'll store cache
  static userCache = new Cache({ namespace: UserCache.name, policy: { maxEntries: 15 }, backend: AsyncStorage });
  static settingsCache = new Cache({
    namespace: SettingsCache.name,
    policy: { maxEntries: 15 },
    backend: AsyncStorage,
  });

  /**
   * cleans cache that we chose
   * @param {*} cacheName
   */
  static cleanCache = (cacheName) => {
    return new Promise((resolve, reject) => {
      switch (cacheName) {
        case UserCache.name:
          this.userCache.clearAll();
          resolve();
          break;
        case SettingsCache.name:
          this.settingsCache.clearAll();
          resolve();
          break;
        default:
          reject("no cache with that name");
      }
    });
  };

  /**
   * removes key from cache
   * @param {*} cacheName
   * @param {*} key
   */
  static removeFromCache(cacheName, key) {
    switch (cacheName) {
      case UserCache.name:
        this.userCache.remove(key);
      case SettingsCache.name:
        this.settingsCache.remove(key);
        break;
    }
  }

  //sets cache with key value pair
  static setCache(cacheName, key, value) {
    switch (cacheName) {
      case UserCache.name:
        this.userCache.set(key, value);
      case SettingsCache.name:
        this.settingsCache.set(key, value);
        break;
    }
  }

  /**
   * gets the value of cache type either from cache or from json
   * @param {*} cache
   * @param {*} cacheName
   * @param {*} type
   */
  static getValueFromCache = async (cache, type) => {
    var entrieCache = cache[type];
    let val;
    // does cache exists?
    if (entrieCache) {
      val = entrieCache.value;
    } else {
      throw new Error("no such enterie in cache");
    }
    return val;
  };

  /**
   * loads the value of cache entri
   * @param {*} cacheName
   * @param {*} entrieName
   */
  static loadEntrieValue = (cacheName, entrieName) => {
    return new Promise(async (resolve, reject) => {
      const cache = await this.loadCache(cacheName);
      try {
        let val = await this.getValueFromCache(cache, entrieName);
        resolve(val);
      } catch (e) {
        reject(e);
      }
    });
  };

  /**
   * returns desired cache enteries
   * @param {*} cacheName
   */
  static loadCache = (cacheName) => {
    return new Promise((resolve, reject) => {
      var cache;
      switch (cacheName) {
        case UserCache.name:
          this.userCache
            .getAll()
            .then((res) => resolve(res))
            .catch((err) => reject(err));
          break;
        case SettingsCache.name:
          this.settingsCache
            .getAll()
            .then((res) => resolve(res))
            .catch((err) => reject(err));
          break;
        default:
          reject("no cache with that name");
      }
    });
  };
}

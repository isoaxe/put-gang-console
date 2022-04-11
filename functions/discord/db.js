export class Database {
  constructor(_store, _collection) {
    this._store = _store; // Firestore database
    this.db = this._store.collection(_collection);
  }
  /**
   * Set a value
   * @example ```js
   * db.set(key, value)
   *
   * db.set("1000001", {
   *  nameL "akio",
   *  tag: 4209
   * })
   * ```
   */
  set(_doc, _data) {
    return new Promise((resolve, reject) => {
      if (!_doc) {
        return reject(new Error("No document name Provided"));
      }
      if (!_data) {
        return reject(new Error("No Data Provided"));
      }
      if (typeof _doc != "string") {
        return reject(new Error("Invalid Document name"));
      }
      if (typeof _data != "object") {
        return reject(new Error("Invalid Data"));
      }
      this.db.doc(_doc).set(_data).then(resolve).catch(reject);
    });
  }
  /**
   * Get a value
   * @example ```js
   * db.get(key)
   *
   * db.get("1000001").then(data => {
   *  console.log(data)
   * })
   *
   * //using await
   * const data = await db.get("1000001")
   * ```
   */
  get(_doc) {
    return new Promise((resolve, reject) => {
      if (!_doc) {
        return reject(new Error("No document name Provided"));
      }
      if (typeof _doc != "string") {
        return reject(new Error("Invalid Document name"));
      }
      this.db
        .doc(_doc)
        .get()
        .then((data) => {
          /**
           * if data exists return data
           */
          if (data.exists) {
            return resolve(data.data());
          } else {
          /**
           * Else (eg no doc exists)
           * Don't throw an error
           * just return null
           */
            return resolve(null);
          }
        })
        .catch(reject);
    });
  }
  /**
   * Get all values from a collection
   * @returns Map<key, value>
   */
  getAll() {
    return new Promise((resolve, reject) => {
      this.db
        .get()
        .then((snap) => {
          /**
           * We'll return the new data as a map
           * Since it's also a key value pair data
           */
          let res = new Map();
          /**
           * Loop throw the result and add to the result map
           */
          snap.forEach((doc) => {
            res.set(doc.id, doc.data());
          });
          return resolve(res);
        })
        .catch(reject);
    });
  }
}

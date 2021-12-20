class Swapi {
    constructor(url) {
        this.url = url || "https://swapi.dev/api/";
        this.promise = this.loadAll();
    }

    async loadResource(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) throw new Error(response.statusText);
            let obj = await response.json();
            if ("next" in obj && obj.next !== null) {
                obj.results.push(...await this.loadResource(obj.next));
            }
            return obj.results;
        } catch(err) {
            throw new Error(`Could not load ${url}\n${err}`);
        }
    }

    async loadAll() {
        try {
            let response = await fetch(this.url);
            if (!response.ok) throw new Error(response.statusText);
            let props = await response.json();
            let promiseArray = [];
            let propertyArray = [];
    
            for (let prop in props) {
                propertyArray.push(prop);
                promiseArray.push(this.loadResource(props[prop]));
            }
    
            let results = await Promise.all(promiseArray);
    
            for (let idx in propertyArray) {
                this[propertyArray[idx]] = results[idx];
            }

            this.replaceWithObjRef(this);
            return true;
        } catch(err) {
            throw new Error(`(${this.url}) Could not load swapi: ${err}`);
        }
    }

    findReplaceHTML(maybeUrl) {
        if (!maybeUrl.startsWith(this.url)) return maybeUrl;
        let M = maybeUrl.slice(this.url.length).match(/(.+)\/(\d+)\//);
        if (M === null) return maybeUrl; // could not match
        let [_, prop, idx] = M, arr = this[prop];
        if (!Array.isArray(arr) || idx > arr.length) return maybeUrl;

        return arr[idx - 1];
    }

    // first call only with obj == this
    replaceWithObjRef(obj) {
        if (Array.isArray(obj)) {
            for (let idx in obj) {
                let o = obj[idx];
                if (typeof o === "string") obj[idx] = this.findReplaceHTML(o);
                else this.replaceWithObjRef(o);
            }
        } else {//if (obj && (obj.constructor === Object)) {
            for (let prop in obj) {
                let o = obj[prop];
                if (!o || prop === "url") continue;
                if (typeof o === "string") obj[prop] = this.findReplaceHTML(o);
                else this.replaceWithObjRef(o);
            }
        }
    }

}

export default Swapi;
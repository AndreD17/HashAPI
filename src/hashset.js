class simpleHashSet {
    constructor(size = 100) {
        this.size = size;
        this.buckets = Array.from({ length: size }, () => []);
    }

    hashFunction(value) {
        return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0) % this.size;
    }

    add(value) {
        const index = this.hashFunction(value);
        const bucket = this.buckets[index];
        if (!bucket.includes(value)) {
            bucket.push(value);
            return true;
        }
        return false;
    }

    

    contains(value) {
        const index = this.hashFunction(value);
        const bucket = this.buckets[index];
        return bucket.includes(value);
    }

    remove(value) {
        const index = this.hashFunction(value);
        const bucket = this.buckets[index];
        const valueIndex = bucket.indexOf(value);
        if (valueIndex !== -1) {
            bucket.splice(valueIndex, 1);
            return true;
        }
        return false;
    }

    getAllUsernames() {
        return this.buckets.flat();
    }
}

export default simpleHashSet;  // ✅ Use ES Module export

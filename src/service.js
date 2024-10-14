// src/service.js
const Repository = require('./repository');
const SecondaryRepository = require('./secondaryRepository');

class Service {
    constructor() {
        this.repository = new Repository();
        this.secondaryRepository = new SecondaryRepository();
    }

    getAllItems() {
        const items = this.repository.getAllItems();
        return items.length > 0 ? items : this.secondaryRepository.getAllItems();
    }

    getItemById(id) {
        // Pertama, coba cari di primary repository
        let item = this.repository.getItemById(id);
        
        // Jika tidak ditemukan, coba di secondary repository
        if (!item) {
            item = this.secondaryRepository.getItemById(id);
        }
        
        // Jika item masih tidak ditemukan, lempar error
        if (!item) {
            throw new Error('Item not found');
        }
        
        return item;
    }

    addItem(item) {
        return this.repository.addItem(item);
    }
}

module.exports = Service;

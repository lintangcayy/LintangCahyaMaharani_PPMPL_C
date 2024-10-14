class SecondaryRepository {
    constructor() {
        this.data = [
            { id: 3, name: 'SecondaryItem1' },
            { id: 4, name: 'SecondaryItem2' }
        ];
    }

    getAllItems() {
        return this.data;
    }

    getItemById(id) {
        return this.data.find(item => item.id === id);
    }

    addItem(item) {
        this.data.push(item);
        return item;
    }
}

module.exports = SecondaryRepository;
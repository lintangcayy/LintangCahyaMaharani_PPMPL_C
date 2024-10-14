const { expect } = require('chai');
const sinon = require('sinon');
const Service = require('../src/service');
const Repository = require('../src/repository');
const SecondaryRepository = require('../src/secondaryRepository');

describe('Service Integration Tests', () => {
    let service;
    let repositoryStub;
    let secondaryRepositoryStub;

    beforeEach(() => {
        // Buat instance dari Service
        service = new Service();

        // Buat stub untuk kedua repository
        repositoryStub = sinon.stub(service.repository, 'getAllItems');
        secondaryRepositoryStub = sinon.stub(service.secondaryRepository, 'getAllItems');
        
        // Stub juga untuk getItemById
        sinon.stub(service.repository, 'getItemById');
        sinon.stub(service.secondaryRepository, 'getItemById');
    });

    afterEach(() => {
        // Mengembalikan stub ke keadaan semula setelah setiap tes
        sinon.restore();
    });

    it('should return all items from primary repository', () => {
        // Stub primary repository untuk mengembalikan data
        repositoryStub.returns([
            { id: 1, name: 'Item1' },
            { id: 2, name: 'Item2' }
        ]);

        const items = service.getAllItems();
        expect(items).to.have.lengthOf(2);
        expect(items[0]).to.have.property('name', 'Item1');
    });

    it('should return all items from secondary repository when primary repository is empty', () => {
        // Stub primary repository untuk mengembalikan array kosong
        repositoryStub.returns([]);
        // Stub secondary repository untuk mengembalikan data
        secondaryRepositoryStub.returns([
            { id: 3, name: 'SecondaryItem1' },
            { id: 4, name: 'SecondaryItem2' }
        ]);

        const items = service.getAllItems();
        expect(items).to.have.lengthOf(2);
        expect(items[0]).to.have.property('name', 'SecondaryItem1');
    });

    it('should return an item by id from primary repository', () => {
        repositoryStub.returns([
            { id: 1, name: 'Item1' },
            { id: 2, name: 'Item2' }
        ]);
        service.repository.getItemById.withArgs(1).returns({ id: 1, name: 'Item1' });

        const item = service.getItemById(1);
        expect(item).to.have.property('name', 'Item1');
    });

    it('should return an item by id from secondary repository if not found in primary', () => {
        // Primary repository tidak memiliki item
        repositoryStub.returns([]);
        service.repository.getItemById.withArgs(1).returns(undefined); // Tidak ditemukan di primary

        // Secondary repository memiliki item
        secondaryRepositoryStub.returns([{ id: 1, name: 'SecondaryItem1' }]);
        service.secondaryRepository.getItemById.withArgs(1).returns({ id: 1, name: 'SecondaryItem1' });

        const item = service.getItemById(1);
        expect(item).to.have.property('name', 'SecondaryItem1');
    });

    it('should throw an error when item is not found in both repositories', () => {
        // Stub primary dan secondary repository untuk mengembalikan array kosong
        repositoryStub.returns([]);
        secondaryRepositoryStub.returns([]);

        service.repository.getItemById.withArgs(999).returns(undefined);
        service.secondaryRepository.getItemById.withArgs(999).returns(undefined);

        expect(() => service.getItemById(999)).to.throw('Item not found');
    });

    it('should add a new item', () => {
        // Stub untuk getAllItems agar bisa mengembalikan data yang valid
        repositoryStub.returns([{ id: 1, name: 'Item1' }, { id: 2, name: 'Item2' }]);

        const newItem = { id: 3, name: 'Item3' };
        const addedItem = service.addItem(newItem); // Menambahkan item baru
        expect(addedItem).to.have.property('name', 'Item3');

        // Memperbarui stub untuk getAllItems setelah menambahkan item
        repositoryStub.returns([
            { id: 1, name: 'Item1' },
            { id: 2, name: 'Item2' },
            { id: 3, name: 'Item3' } // Menambahkan item baru ke dalam stub
        ]);

        const allItems = service.getAllItems(); // Mendapatkan semua item setelah penambahan
        expect(allItems).to.have.lengthOf(3);
        expect(allItems).to.deep.include(newItem); // Memastikan item baru ditambahkan
    });
});

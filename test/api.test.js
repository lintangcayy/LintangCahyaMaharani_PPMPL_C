import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('API Testing', () => {
    it('should return all items', (done) => {
        request(app)
            .get('/api/items')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.at.least(1);
                done();
            });
    });

    it('should create a new item', (done) => {
        const newItem = { name: 'Item 3' };
        request(app)
            .post('/api/items')
            .send(newItem)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('name', 'Item 3');
                done();
            });
    });

    // Latihan 1: Pengujian DELETE untuk menghapus item
    it('should delete an item', (done) => {
        const itemIdToDelete = 1;

        request(app)
            .delete(`/api/items/${itemIdToDelete}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Item deleted successfully');
                done();
            });
    });

    // Pengujian untuk menghapus item yang tidak ada
    it('should return 404 when trying to delete a non-existing item', (done) => {
        const nonExistingItemId = 999;

        request(app)
            .delete(`/api/items/${nonExistingItemId}`)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message', 'Item not found');
                done();
            });
    });

    // Latihan 2: Pengujian PUT untuk memperbarui item
    it('should update an item', (done) => {
        const itemIdToUpdate = 2;
        const updatedItem = { name: 'Updated Item' };

        request(app)
            .put(`/api/items/${itemIdToUpdate}`)
            .send(updatedItem)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('id', itemIdToUpdate);
                expect(res.body).to.have.property('name', 'Updated Item');
                done();
            });
    });

    // Pengujian untuk memperbarui item yang tidak ada
    it('should return 404 when trying to update a non-existing item', (done) => {
        const nonExistingItemId = 999;
        const updatedItem = { name: 'Updated Item' };

        request(app)
            .put(`/api/items/${nonExistingItemId}`)
            .send(updatedItem)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message', 'Item not found');
                done();
            });
    });

    // Pengujian untuk pembuatan item dengan data yang tidak valid
    it('should return 400 when trying to create an item without a name', (done) => {
        const invalidItem = {}; // Data tidak valid

        request(app)
            .post('/api/items')
            .send(invalidItem)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('message', 'Name is required');
                done();
            });
    });
});

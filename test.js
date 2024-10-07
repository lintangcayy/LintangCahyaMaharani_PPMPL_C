import { expect } from "chai";
import { tambah, kali, kurang, bagi } from "./math.js";

describe("Pengujian Fungsi Matematika", function () {
  // Test case yang sudah ada
  it("seharusnya mengembalikan 5 saat menambahkan 2 + 3", function () {
    expect(tambah(2, 3)).to.equal(5);
  });

  it("seharusnya mengembalikan 8 saat mengalikan 2 * 4", function () {
    expect(kali(2, 4)).to.equal(8);
  });

  it("seharusnya mengembalikan 5 saat mengurangkan 7 - 2", function () {
    expect(kurang(7, 2)).to.equal(5);
  });

  it("seharusnya mengembalikan 4 saat membagi 8 / 2", function () {
    expect(bagi(8, 2)).to.equal(4);
  });

  // Test case untuk fungsi bagi
  it("seharusnya mengembalikan error saat membagi dengan 0", function () {
    expect(() => bagi(8, 0)).to.throw("Tidak bisa membagi dengan nol");
  });

  // Test case tambahan untuk fungsi tambah
  it("seharusnya mengembalikan error jika input berupa string pada fungsi tambah", function () {
    expect(() => tambah("2", 3)).to.throw("Input harus berupa angka");
  });

  it("seharusnya mengembalikan error jika input berupa null pada fungsi tambah", function () {
    expect(() => tambah(null, 3)).to.throw("Input tidak boleh null atau undefined");
  });

  it("seharusnya mengembalikan error jika salah satu input berupa undefined pada fungsi tambah", function () {
    expect(() => tambah(2, undefined)).to.throw("Input tidak boleh null atau undefined");
  });

  // Test case tambahan untuk fungsi kali
  it("seharusnya mengembalikan error jika input berupa string pada fungsi kali", function () {
    expect(() => kali("2", 4)).to.throw("Input harus berupa angka");
  });

  it("seharusnya mengembalikan error jika input berupa null pada fungsi kali", function () {
    expect(() => kali(null, 4)).to.throw("Input tidak boleh null atau undefined");
  });

  it("seharusnya mengembalikan error jika salah satu input berupa undefined pada fungsi kali", function () {
    expect(() => kali(4, undefined)).to.throw("Input tidak boleh null atau undefined");
  });

  // Test case tambahan untuk fungsi kurang
  it("seharusnya mengembalikan nilai negatif saat mengurangkan 3 - 5", function () {
    expect(kurang(3, 5)).to.equal(-2);
  });

  it("seharusnya mengembalikan error jika input berupa string pada fungsi kurang", function () {
    expect(() => kurang("3", 5)).to.throw("Input harus berupa angka");
  });

  it("seharusnya mengembalikan error jika input berupa null pada fungsi kurang", function () {
    expect(() => kurang(null, 5)).to.throw("Input tidak boleh null atau undefined");
  });

  it("seharusnya mengembalikan error jika salah satu input berupa undefined pada fungsi kurang", function () {
    expect(() => kurang(3, undefined)).to.throw("Input tidak boleh null atau undefined");
  });

  // Test case tambahan untuk fungsi bagi
  it("seharusnya mengembalikan error jika input berupa string pada fungsi bagi", function () {
    expect(() => bagi("8", 2)).to.throw("Input harus berupa angka");
  });

  it("seharusnya mengembalikan error jika input berupa null pada fungsi bagi", function () {
    expect(() => bagi(null, 2)).to.throw("Input tidak boleh null atau undefined");
  });

  it("seharusnya mengembalikan error jika salah satu input berupa undefined pada fungsi bagi", function () {
    expect(() => bagi(8, undefined)).to.throw("Input tidak boleh null atau undefined");
  });

  it("seharusnya mengembalikan error saat membagi 0 / 0", function () {
    expect(() => bagi(0, 0)).to.throw("Tidak bisa membagi dengan nol");
  });
});

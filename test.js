import { expect } from "chai";
import { tambah, kali, kurang, bagi } from "./math.js";

describe("Pengujian Fungsi Matematika", function () {
  it("seharusnya mengembalikan 5 saat menambahkan 2 + 3", function () {
    expect(tambah(2, 3)).to.equal(5);
  });

  it("seharusnya mengembalikan 8 saat mengalikan 2 * 4", function () {
    expect(kali(2, 4)).to.equal(8);
  });

  it("seharusnya mengembalikan 0 saat mengurangkan 7 - 2", function () {
    expect(kurang(7, 2)).to.equal(5);
  });

  it("seharusnya mengembalikan 2 saat membagi 8 / 2", function () {
    expect(bagi(8, 2)).to.equal(4);
  });

  it("seharusnya mengembalikan error saat membagi dengan 0", function () {
    expect(() => bagi(8, 0)).to.throw("Tidak bisa membagi dengan nol");
  });
});
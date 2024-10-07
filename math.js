export function tambah(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Input harus berupa angka");
  }
  if (a == null || b == null) {
    throw new Error("Input tidak boleh null atau undefined");
  }
  return a + b;
}

export function kali(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Input harus berupa angka");
  }
  if (a == null || b == null) {
    throw new Error("Input tidak boleh null atau undefined");
  }
  return a * b;
}

export function kurang(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Input harus berupa angka");
  }
  if (a == null || b == null) {
    throw new Error("Input tidak boleh null atau undefined");
  }
  return a - b;
}

export function bagi(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Input harus berupa angka");
  }
  if (a == null || b == null) {
    throw new Error("Input tidak boleh null atau undefined");
  }
  if (b === 0) {
    throw new Error("Tidak bisa membagi dengan nol");
  }
  return a / b;
}

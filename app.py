from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Selamat datang di API Anda!"

@app.route('/users/<int:user_id>')
def get_user(user_id):
    # Ganti dengan logika untuk mengambil data pengguna
    return f"Data untuk pengguna dengan ID {user_id}"

if __name__ == '__main__':
    app.run(debug=True)

# Endpoint untuk mendapatkan daftar pengguna
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify([
        {"id": 1, "name": "User 1"},
        {"id": 2, "name": "User 2"},
        {"id": 3, "name": "User 3"}
    ])

# Endpoint untuk mendapatkan detail pengguna berdasarkan ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    return jsonify({"id": user_id, "name": f"User {user_id}"})

# Endpoint untuk membuat posting baru
@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    return jsonify({
        "id": 101,
        "title": data.get("title"),
        "body": data.get("body"),
        "userId": data.get("userId")
    }), 201

# Endpoint untuk memperbarui posting berdasarkan ID
@app.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    data = request.get_json()
    return jsonify({
        "id": post_id,
        "title": data.get("title"),
        "body": data.get("body"),
        "userId": data.get("userId")
    })

# Endpoint untuk menghapus posting berdasarkan ID
@app.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    return jsonify({"message": f"Post {post_id} deleted"}), 204

if __name__ == '__main__':
    app.run(debug=True, port=5000)

from flask import Flask, request, jsonify
import os

# Creating folder to store data
app = Flask(__name__)
SAVE_DIR = "data_saved"
os.makedirs(SAVE_DIR, exist_ok=True)

@app.route('/')
def home():
    return "Data compiling service is running!"

@app.route('/enter-data', methods=['POST'])
def add_data():
    data = request.get_json()

    file_name = data.get('file_name')
    data_entry = data.get('data_entry')
    delete = data.get('delete')

    if delete == 'True':
        if os.path.isfile(file_name):
            os.remove(f"{file_name}")
            return jsonify({'message': 'File successfully deleted'}), 200
        else:
            return jsonify({'error': 'File not found'}), 400
    else:
        f = open(file_name, 'a')
        f.write(data_entry)
        f.write('\n')
        f.close()
        return jsonify({'message': 'File successfully updated'}), 200


if __name__ == '__main__':
    app.run(port=5555, debug=True)
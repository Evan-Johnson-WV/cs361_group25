import requests

data = {'file_name': 'test_file_1.txt',
        'data_entry': '',
        'delete': 'True'}

r = requests.post('http://localhost:5555/enter-data', json=data)
print(r.json())
print(r.status_code)
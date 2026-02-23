import requests

data = {'file_name': 'test_file.txt',
        'data_entry': 'This is a test to see if this works',
        'delete': 'False'}

r = requests.post('http://localhost:5555/enter-data', json=data)
print(r.json())
print(r.status_code)
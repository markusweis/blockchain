import requests
print("test")
res = requests.post('http://localhost:5000/hash', json={"string":"1001325612d7f44"})
print("im here",res.ok)

if res.ok:
    print(res.json())
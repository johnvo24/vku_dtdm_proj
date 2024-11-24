import requests

url = 'http://127.0.0.1:5000/predict'
data = {
    'gender': [0],
    'fitness_goal': [1],
    'age': [30],
    'bmi': [25.5]
}

response = requests.post(url, json=data)

print(response.json())

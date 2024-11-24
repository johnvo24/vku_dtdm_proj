from flask import Flask, request, jsonify
import joblib
import pandas as pd

model = joblib.load('./xgb_model.pkl')

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_data = pd.DataFrame([data])
    predictions = model.predict(input_data)

    return jsonify({'predictions': predictions.tolist()})

if __name__ == '__main__':
    app.run(debug=True)

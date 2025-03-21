from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import pickle # Để lưu và tải mô hình

app = FastAPI()

# 1. Load mô hình đã huấn luyện (thay vì huấn luyện lại mỗi lần)
try:
    with open("model.pkl", "rb") as f:
        model = pickle.load(f)
    with open("x_train_columns.pkl", "rb") as f: # Load danh sách cột của X_train
        x_train_columns = pickle.load(f)
except FileNotFoundError:
    raise RuntimeError("Không tìm thấy file model.pkl hoặc x_train_columns.pkl. Vui lòng huấn luyện mô hình trước.")

# 2. Định nghĩa Pydantic model cho input (để validation)
class InputData(BaseModel):
    fitness_goal: int
    age_avg: float
    bmi_avg: float
    gender: int

# 3. Endpoint dự đoán
@app.post("/predict")
async def predict_plan_id(input_data: InputData):
    try:
        # Chuyển input sang DataFrame
        new_input = pd.DataFrame([input_data.dict()])

        # One-hot encoding
        new_input = pd.get_dummies(new_input, columns=['fitness_goal'])

        # Xử lý cột bị thiếu
        missing_cols = set(x_train_columns) - set(new_input.columns)
        for c in missing_cols:
            new_input[c] = 0
        new_input = new_input[x_train_columns]

        # Dự đoán
        prediction = model.predict(new_input)
        predicted_plan_id = int(prediction[0]) # Ép kiểu về int để trả về JSON

        return {"predicted_plan_id": predicted_plan_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Code huấn luyện và lưu model (chạy 1 lần)
def train_and_save_model():
    data = pd.read_csv("your_data.csv")
    data = pd.get_dummies(data, columns=['fitness_goal'])
    X = data.drop("plan_id", axis=1)
    y = data["plan_id"]
    X_train = X # Không cần train_test_split ở đây vì ta đã có dữ liệu đầy đủ
    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y)
    with open("model.pkl", "wb") as f:
        pickle.dump(model, f)
    with open("x_train_columns.pkl", "wb") as f: # Lưu danh sách cột của X_train
        pickle.dump(X_train.columns, f)

if __name__ == "__main__":
    import uvicorn
    # Huấn luyện và lưu model nếu chưa có
    try:
        with open("model.pkl", "rb"):
            pass
    except FileNotFoundError:
        train_and_save_model()

    uvicorn.run(app, host="localhost", port=8000)
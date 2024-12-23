import requests
import json

url = "http://localhost:8000/predict"  # URL của API

# Dữ liệu input (ví dụ)
input_data = {
    "fitness_goal": 2,
    "age_avg": 35,
    "bmi_avg": 26,
    "gender": 1
}

# Chuyển dữ liệu sang JSON
json_data = json.dumps(input_data)

# Thiết lập header cho request (bắt buộc với JSON)
headers = {"Content-Type": "application/json"}

try:
    # Gửi POST request
    response = requests.post(url, data=json_data, headers=headers)

    # Kiểm tra status code
    response.raise_for_status()  # Ném exception nếu status code không phải 2xx

    # Lấy kết quả trả về (đã được parse từ JSON)
    result = response.json()
    predicted_plan_id = result["predicted_plan_id"]

    print(f"Plan ID được dự đoán: {predicted_plan_id}")

except requests.exceptions.RequestException as e:
    print(f"Lỗi khi gửi request: {e}")
except (KeyError, TypeError) as e:
    print(f"Lỗi khi xử lý response JSON: {e}")
except Exception as e:
    print(f"Lỗi không xác định: {e}")
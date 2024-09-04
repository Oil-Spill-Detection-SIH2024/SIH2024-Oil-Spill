import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import IsolationForest
import numpy as np

# Load data
data = pd.read_csv('ship_data.csv')  # Replace with the actual path to the CSV file

# Convert BaseDateTime to datetime object
data['BaseDateTime'] = pd.to_datetime(data['BaseDateTime'])

# Extract time-based features
data['hour'] = data['BaseDateTime'].dt.hour
data['day_of_week'] = data['BaseDateTime'].dt.dayofweek
data['month'] = data['BaseDateTime'].dt.month

# Encode Status
label_encoder_status = LabelEncoder()
data['status_encoded'] = label_encoder_status.fit_transform(data['Status'])

# Select features (without MMSI)
features = ['SOG', 'COG', 'Heading', 'status_encoded', 'hour', 'day_of_week', 'month']
X = data[features]

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train Isolation Forest
iso_forest = IsolationForest(contamination=0.01, random_state=42)
iso_forest.fit(X_scaled)

# Predict anomalies
data['anomaly'] = iso_forest.predict(X_scaled)  # -1 for anomaly, 1 for normal
anomalies = data[data['anomaly'] == -1]

# Output the anomalies
print(anomalies)
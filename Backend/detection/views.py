# # detection/views.py
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .serializers import AISDataSerializer, SARDataSerializer
# from .models import AISData
# import joblib

# # Load the ML model (AIS anomaly detection)
# anomaly_detection_model = joblib.load('path_to_anomaly_model.pkl')

# @api_view(['POST'])
# def submit_ais_data(request):
#     serializer = AISDataSerializer(data=request.data)
#     if serializer.is_valid():
#         ais_data = serializer.save()
#         # Predict anomaly using the ML model
#         features = [ais_data.latitude, ais_data.longitude, ais_data.speed, ais_data.course]
#         prediction = anomaly_detection_model.predict([features])[0]
#         ais_data.anomaly_detected = bool(prediction)
#         ais_data.save()
#         return Response({'anomaly': ais_data.anomaly_detected})
#     return Response(serializer.errors, status=400)

# @api_view(['POST'])
# def submit_sar_data(request):
#     serializer = SARDataSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=400)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AISDataSerializer, SARDataSerializer
from .models import AISData
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
    except (AttributeError, Token.DoesNotExist):
        pass
    return Response({"detail": "Successfully logged out."})
# Mock Model for Testing
class MockAnomalyDetectionModel:
    def predict(self, X):
        # Simulate a random anomaly detection (True or False)
        # In real usage, this would be your trained model's prediction
        return [1 if x[0] > 0 else 0 for x in X]  # Dummy logic for example purposes

# Use the mock model for testing instead of loading from a .pkl file
anomaly_detection_model = MockAnomalyDetectionModel()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_ais_data(request):
    serializer = AISDataSerializer(data=request.data)
    if serializer.is_valid():
        ais_data = serializer.save()
        
        # Use dummy features from the saved data
        features = [ais_data.latitude, ais_data.longitude, ais_data.speed, ais_data.course]
        
        # Mock predict method call
        prediction = anomaly_detection_model.predict([features])[0]
        
        # Convert the prediction to boolean
        ais_data.anomaly_detected = bool(prediction)
        ais_data.save()
        
        return Response({'anomaly': ais_data.anomaly_detected})
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_sar_data(request):
    serializer = SARDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

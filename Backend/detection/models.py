# detection/models.py
from django.db import models

class AISData(models.Model):
    vessel_name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    speed = models.FloatField()
    course = models.FloatField()
    timestamp = models.DateTimeField()
    anomaly_detected = models.BooleanField(default=False)

    def __str__(self):
        return self.vessel_name

class SARData(models.Model):
    image = models.ImageField(upload_to='sar_images/')
    detected_spill = models.BooleanField(default=False)
    ais_data = models.ForeignKey(AISData, on_delete=models.CASCADE)

    def __str__(self):
        return f"SAR for {self.ais_data.vessel_name}"

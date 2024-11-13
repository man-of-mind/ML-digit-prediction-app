import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, PanResponder, TouchableOpacity } from 'react-native';
import Canvas from 'react-native-canvas';
import axios from 'axios';

export default function HomeScreen() {
  const [prediction, setPrediction] = useState<null | number>();
  const canvasRef = useRef<Canvas | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasWidth = 300;
  const canvasHeight = 180;

  const handleCanvas = (canvas: Canvas | null) => {
    if (canvas) {
      canvasRef.current = canvas;
      canvasRef.current = canvas;
      const context = canvas.getContext('2d');
      context.lineWidth = 5;
      context.strokeStyle = '#000000';
      contextRef.current = context;
    }
  };

  // PanResponder to handle touch events
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (contextRef.current) {
          const { locationX, locationY } = evt.nativeEvent;
          contextRef.current.beginPath();
          contextRef.current.moveTo(locationX, locationY);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (contextRef.current) {
          const { locationX, locationY } = evt.nativeEvent;
          contextRef.current.lineTo(locationX, locationY);
          contextRef.current.stroke();
        }
      },
      onPanResponderRelease: () => {
        if (contextRef.current) {
          contextRef.current.closePath();
        }
      },
    })
  ).current;

  const handleClear = () => {
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
      // Force a new drawing path to fully clear any remaining state
      contextRef.current.beginPath();
      setPrediction(null);
    }
  };

  const handlePrediction = async () => {
    if (!canvasRef.current) {
      Alert.alert('Error', 'Canvas not available');
      return;
    }

    // Convert canvas drawing to base64
    canvasRef.current.toDataURL('image/png').then(async (base64) => {
      if (!base64 || base64.includes("iVBORw0KGgoAAAANSUhEUgAAAXEAAAFxCAIAAADtbx6fAAAAJElEQVR42u3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAD4HeQAAUsqz+kAAAAASUVORK5CYII=")) {
        console.log("Canvas is empty, no drawing detected");
        Alert.alert('No drawing detected. Please draw something before prediction.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('drawing', base64);

        const response = await axios.post('https://your-api-url.com/predict', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // setPrediction(response.data.prediction);
        setPrediction(7);
      } catch (error) {
        console.error('Error predicting digit:', error);
        Alert.alert('Error', 'Could not predict the digit');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Draw a Digit</Text>

      <View {...panResponder.panHandlers} style={[styles.canvasContainer, { width: canvasWidth, height: canvasHeight }]}>
        <Canvas ref={handleCanvas} style={{ width: canvasWidth, height: canvasHeight }} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePrediction}>
          <Text style={styles.buttonText}>Predict Digit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {prediction && (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionText}>Predicted Digit: {prediction}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00796b',
    marginTop: 20,
    // fontFamily: 'Helvetica',
  },
  canvasContainer: {
    borderColor: '#00796b',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00796b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  predictionContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    borderColor: '#00796b',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  predictionText: {
    fontSize: 22,
    color: '#00796b',
    fontWeight: 'bold',
  },
});

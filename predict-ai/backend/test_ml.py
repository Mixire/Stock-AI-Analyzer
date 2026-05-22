from ml.pipeline import predict_ticker

try:
    print("Testing prediction for AAPL...")
    result = predict_ticker("AAPL")
    print(f"Prediction: {result['prediction']}")
    print(f"Confidence: {result['confidence']:.2%}")
    print(f"Current Price: ${result['current_price']:.2f}")
except Exception as e:
    print(f"Error: {e}")

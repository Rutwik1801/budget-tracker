import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { getRandomDarkColor } from "../../utils/date";

const BarChartWebView = ({ transactionTypes, transactionValues }) => {
  console.log({transactionTypes, transactionValues})
  const webViewRef = useRef(null);
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
  const backCols = transactionTypes.map(() => getRandomDarkColor());

  useEffect(() => {
    if (isWebViewLoaded && webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({ transactionTypes, transactionValues, backCols })
      );
    }
  }, [isWebViewLoaded, transactionTypes, transactionValues]);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        body {
          background-color: transparent;
          margin: 0; padding: 0;
          display: flex; justify-content: center; align-items: center;
          height: 100vh;
        }
        canvas {
          width: 90vw !important;
          height: 90vh !important;
        }
      </style>
    </head>
    <body>
      <canvas id="transactionBarChart"></canvas>

      <script>
        let transactionChart;

        function updateChart(data) {
          if (!transactionChart) {
            var ctx = document.getElementById('transactionBarChart').getContext('2d');
            transactionChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: data.transactionTypes,
                datasets: [{
                  label: 'Transactions',
                  data: data.transactionValues,
                  backgroundColor: data.backCols,
                  hoverOffset: 4
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
              }
            });
          } else {
            transactionChart.data.labels = data.transactionTypes;
            transactionChart.data.datasets[0].data = data.transactionValues;
            transactionChart.data.datasets[0].backgroundColor = data.backCols;
            transactionChart.update();
          }
        }

        window.addEventListener('message', function(event) {
          try {
            var data = JSON.parse(event.data);
            updateChart(data);
          } catch (error) {
            window.ReactNativeWebView.postMessage("Error parsing message: " + error.message);
          }
        });

        window.ReactNativeWebView.postMessage("WebView Loaded");
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ minHeight: 300, backgroundColor: "transparent", padding: 20, marginBottom: 30 }}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        style={{ backgroundColor: "transparent" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={`
          window.addEventListener('message', function(event) {
            try {
              var data = JSON.parse(event.data);
              updateChart(data);
            } catch (error) {
              window.ReactNativeWebView.postMessage("Error parsing message: " + error.message);
            }
          });
          true;
        `}
        onLoad={() => {
          setIsWebViewLoaded(true);
        }}
        onMessage={(event) => {
          console.log("WebView Message:", event.nativeEvent.data);
        }}
        onError={(syntheticEvent) => {
          console.error("WebView Error:", syntheticEvent.nativeEvent);
        }}
      />
    </View>
  );
};

export default BarChartWebView;

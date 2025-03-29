import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { getRandomDarkColor } from "../../utils/utilFunctions";

const ChartWebView = ({ expenseCategories, expenseValues }) => {
  const webViewRef = useRef(null);
  const backCols = expenseCategories.map(() => getRandomDarkColor());

  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({ expenseCategories, expenseValues, backCols })
      );
    }
  }, [expenseCategories, expenseValues]);

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
          width: 100vw !important;
          height: 100vh !important;
        }
      </style>
    </head>
    <body>
      <canvas id="expenseChart"></canvas>

      <script>
        let expenseChart;

        function updateChart(data) {
          if (!expenseChart) {
            var ctx = document.getElementById('expenseChart').getContext('2d');
            expenseChart = new Chart(ctx, {
              type: 'doughnut',
              data: {
                labels: data.expenseCategories,
                datasets: [{
                  label: 'Expenses',
                  data: data.expenseValues,
                  backgroundColor: data.backCols,
                  hoverOffset: 4
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { 
                    position: 'bottom',
                    labels: { font: { size: 40 } }
                  }
                }
              }
            });
          } else {
            // Update the existing chart with new data
            expenseChart.data.labels = data.expenseCategories;
            expenseChart.data.datasets[0].data = data.expenseValues;
            expenseChart.data.datasets[0].backgroundColor = data.backCols;
            expenseChart.update();
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
        onLoad={() => {
          setTimeout(() => {
            if (webViewRef.current) {
              webViewRef.current.postMessage(
                JSON.stringify({ expenseCategories, expenseValues, backCols })
              );
            }
          }, 1000);
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

export default ChartWebView;

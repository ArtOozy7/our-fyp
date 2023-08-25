document.addEventListener('DOMContentLoaded', function() {
  // Define the predictPCOS function
  function predictPCOS(selectedSymptoms) {
    // Define the prediction rules
    var prediction = "";
    var additionalInfo = "";

    // ... (your existing prediction logic here) ...
if (
      (selectedSymptoms.includes('irregular periods') ||
        selectedSymptoms.includes('weight gain') ||
        selectedSymptoms.includes('acne') ||
        selectedSymptoms.includes('excessive hair growth')) &&
      selectedSymptoms.length >= 2
    ) {
      prediction = "High likelihood of PCOS";
      additionalInfo = "PCOS is a hormonal disorder common among women of reproductive age. It may cause irregular periods, weight gain, acne, and excessive hair growth.";
    } else if (
      ((selectedSymptoms.includes('acne') || selectedSymptoms.includes('oily skin')) &&
        (selectedSymptoms.includes('thinning hair or hair loss') || selectedSymptoms.includes('hair loss'))) ||
      (selectedSymptoms.includes('weight gain') && selectedSymptoms.length >= 2)
    ) {
      prediction = "Medium likelihood of PCOS";
      additionalInfo = "PCOS is a hormonal disorder common among women of reproductive age. It may cause acne, oily skin, thinning hair or hair loss, and weight gain.";
    } else if (selectedSymptoms.includes('mood swings') || selectedSymptoms.includes('irritability')) {
      prediction = "Low likelihood of PCOS";
      additionalInfo = "Mood swings and irritability can be caused by various factors and may not necessarily indicate PCOS. Consider consulting a healthcare professional for a proper diagnosis.";
    } else {
      prediction = "No specific prediction based on the selected symptoms";
      additionalInfo = "The selected symptoms do not provide enough information to make a prediction about PCOS. It is advisable to consult a healthcare professional for a proper evaluation.";
    }

    // Return the prediction result without creating the chart
    return { prediction: prediction, additionalInfo: additionalInfo };
  }

  // Attach submit event listener to symptomForm
  var symptomForm = document.getElementById('symptomForm');
  symptomForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the selected symptoms
    var selectedSymptoms = [];
    var checkboxes = document.getElementsByName('symptom');

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        selectedSymptoms.push(checkboxes[i].value);
      }
    }

    // Call the predictPCOS() function with the selected symptoms
    var prediction = predictPCOS(selectedSymptoms);

    // Get the predictionResult element
    var predictionResultElement = document.getElementById('predictionResult');

    // Display the prediction result
    predictionResultElement.innerHTML = '<p>Prediction: ' + prediction.prediction + '</p><p>' + prediction.additionalInfo + '</p>';

    // Create a canvas element for the chart
    var chartCanvas = document.createElement('canvas');
    chartCanvas.id = 'predictionChart';
    predictionResultElement.appendChild(chartCanvas);

    // Calculate prediction likelihoods
    var highLikelihood = prediction.prediction === "High likelihood of PCOS" ? 70 : 0;
    var mediumLikelihood = prediction.prediction === "Medium likelihood of PCOS" ? 20 : 0;
    var lowLikelihood = prediction.prediction === "Low likelihood of PCOS" ? 5 : 0;
    var noneLikelihood = prediction.prediction === "No specific prediction based on the selected symptoms" ? 5 : 0;

    // Create a bar chart using Chart.js
    var ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['High', 'Medium', 'Low', 'None'],
        datasets: [{
          label: 'Prediction Likelihood',
          data: [highLikelihood, mediumLikelihood, lowLikelihood, noneLikelihood],
          backgroundColor: ['red', 'orange', 'yellow', 'green']
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Likelihood (%)'
            }
          }
        }
      }
    });

    return false; // Prevent form submission and page reload
  });
});

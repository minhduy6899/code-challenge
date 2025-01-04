const form = document.getElementById("swap-form");
const inputAmount = document.getElementById("input-amount");
const outputAmount = document.getElementById("output-amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const errorMsg = document.getElementById("error-msg");

// Mock exchange rates
const exchangeRates = {
  USD: { EUR: 0.85, JPY: 110 },
  EUR: { USD: 1.18, JPY: 129 },
  JPY: { USD: 0.0091, EUR: 0.0077 },
};

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission
  errorMsg.textContent = "";

  const amount = parseFloat(inputAmount.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    errorMsg.textContent = "Please enter a valid amount.";
    return;
  }

  if (!from || !to || from === to) {
    errorMsg.textContent = "Please select valid currencies.";
    return;
  }

  // Calculate exchange
  const rate = exchangeRates[from][to];
  const result = (amount * rate).toFixed(2);
  outputAmount.value = result;

  alert(`You will receive ${result} ${to}`);
});

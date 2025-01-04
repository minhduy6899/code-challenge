# Problem 1: Summation of Integers

## Implementations for Calculating Summation in JavaScript

### 1. Iterative Approach

#### This method uses a loop to calculate the summation.

```
function summationIterative(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

// Example usage
const n = 5;
console.log(summationIterative(n)); // Output: 15
```

### 2. Mathematical Formula

#### The summation of the first n integers is calculated using the formula:

```
function summationFormula(n) {
  return (n * (n + 1)) / 2;
}

// Example usage
const n = 5;
console.log(summationFormula(n)); // Output: 15
```

### 3. Recursive Approach

#### This method uses recursion to calculate the summation.

```
function summationRecursive(n) {
if (n === 0) {
return 0;
}
return n + summationRecursive(n - 1);
}

// Example usage
const n = 5;
console.log(summationRecursive(n)); // Output: 15
```

#### Key Differences

Iterative: Uses a loop, straightforward and efficient for all n.

Mathematical Formula: The most efficient method with constant time complexity.

Recursive: Elegant but could run into stack overflow for very large n due to call stack limitations.

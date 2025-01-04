# Problem 3

# Issues and Anti-Patterns

## 1. Misuse of useMemo

#### Problem:

useMemo is used to memoize sortedBalances, but the function inside it is unnecessarily complex, containing filtering and sorting logic that could be simplified or moved elsewhere.

Dependencies (balances, prices) may trigger unnecessary recomputations, especially when they do not change frequently.

#### Solution:

Simplify the logic in useMemo or move the computation to a dedicated utility function or hook. Ensure dependencies are accurate.

---

## 2. Inefficient Sorting Logic

#### Problem:

Sorting and filtering are mixed, reducing readability and increasing complexity.

filter condition is flawed as it references lhsPriority, which is undefined.

#### Solution:

Separate filtering and sorting into distinct steps. Correct the variable reference for priority calculation.

---

## 3. Hardcoded Priorities

#### Problem:

getPriority uses hardcoded values for priority mapping, making it difficult to maintain or extend.

#### Solution:

Use a mapping object or configuration file for blockchain priorities.

---

## 4. Incorrect Type Usage

#### Problem:

WalletBalance is used inconsistently (e.g., missing blockchain in the interface).

FormattedWalletBalance is not fully utilized where required.

#### Solution:

Update WalletBalance to include blockchain and use correct types consistently.

---

## 5. Inefficient Mapping

#### Problem:

Both sortedBalances and formattedBalances loop over the same data but perform redundant operations.

#### Solution:

Combine these mappings into a single step.

---

## 6. Key Usage in React

#### Problem:

Using index as a key in rows can lead to rendering bugs when the list is reordered or modified.

#### Solution:

Use a unique identifier from the data (e.g., currency) as the key.

---

## 7. Side Effects in Functional Components

#### Problem:

Potential reliance on prices and balances without ensuring their validity (e.g., null or undefined values).

#### Solution:

Validate data before processing or rendering.

---

## 8. Overuse of Props Spread

#### Problem:

Spreading props (...rest) into the root div without specifying allowed attributes can unintentionally add unwanted attributes.

#### Solution:

Explicitly specify which props are passed to the root element.

---

## Refactored Code

```
interface WalletBalance {

currency: string;

amount: number;

blockchain: string;

}


interface FormattedWalletBalance extends WalletBalance {

formatted: string;

}


interface Props extends BoxProps {}


const priorityMap: Record<string, number> = {

Osmosis: 100,

Ethereum: 50,

Arbitrum: 30,

Zilliqa: 20,

Neo: 20,

};


const getPriority = (blockchain: string): number => priorityMap[blockchain] ?? -99;


const WalletPage: React.FC<Props> = ({ children, ...rest }: Props) => {

const balances = useWalletBalances();

const prices = usePrices();


const formattedBalances = useMemo(() => {

if (!balances || !prices) return [];


return balances

.filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)

.sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))

.map((balance) => ({

...balance,

formatted: balance.amount.toFixed(2),

}));

}, [balances, prices]);


const rows = useMemo(() => {

return formattedBalances.map((balance) => {

const usdValue = prices[balance.currency] * balance.amount;

return (

<WalletRow

className="wallet-row"

key={balance.currency}

amount={balance.amount}

usdValue={usdValue}

formattedAmount={balance.formatted}

/>

);

});

}, [formattedBalances, prices]);


return <div {...rest}>{rows}</div>;

};
```

---

## Improvements

### 1. Efficient Data Handling:

Combined filtering, sorting, and formatting into a single useMemo block for clarity and efficiency.

### 2. Priority Mapping:

Replaced the getPriority function with a priorityMap object for maintainability.

### 3. Key Assignment:

Used a unique identifier (currency) instead of index as the React key.

### 4. Type Safety:

Added blockchain to WalletBalance and used FormattedWalletBalance consistently.

### 5. Prop Handling:

Spread props thoughtfully and validated input data (balances, prices) to avoid runtime errors.

### 6. Readability:

Simplified and organized the code for better maintainability and comprehension.

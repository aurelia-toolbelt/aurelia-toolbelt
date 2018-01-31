```js
{
  '40': { message: 'veryWeak', color: '.danger' },  // 1   <= score <  40
  '80': { message: 'weak', color: '.warning' },     // 40  <= score <  80
  '120': { message: 'medium', color: '#D8B600' },   // 80  <= score <  120
  '180': { message: 'strong', color: '#6495ED' },   // 120 <= score <  180
  '200': { message: 'veryStrong', color: 'green' }, // 180 <= score <  200
  '_': { message: 'perfect', color: 'darkgreen' }   //        score >= 200
};
```

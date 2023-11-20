import { Counter } from './counter';

const counter1 = Counter.getInstance();
counter1.increment(); // 1
counter1.increment(); // 2
counter1.increment(); // 3
counter1.increment(); // 4

const counter2 = Counter.getInstance();
counter1.increment(); // 5
counter1.increment(); // 6
counter1.increment(); // 7
counter1.increment(); // 8
console.log(counter2.count);

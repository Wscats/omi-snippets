let nameu: string = `Gene`;
let ageu: number = 37;
let sentenceu: string = `Hello, my name is ${name}.`

// interface Fn {
//     (num1: number, num2: number): number;
// }

// let Fn: Fn = (num1, num2) => {
//     return num1 + num2;
// };

// Fn(1, 2);

interface SquareConfig {
    color?: string;
    width?: number;
}

interface SquareResult {
    width?: number;
    color?: string;
    area?: number;
}

function createSquare(config: SquareConfig, shop: number = 20): SquareResult {
    return {
        color: config.color,
        area: 14
    }
}

let mySquare = createSquare({ color: "red" });


interface Fn {
    (x: number, y: number, good: string): {
        sum: number,
        good: string
    };
}

const add: Fn = function (x, y, good) {
    return {
        sum: x + y,
        good: good
    };
}

let arr: Array<number> = [1, 2, 3];

let list2: number[] = [1, 2, 3];

// let arr: string[] = ["Oaoafly", "Corrine", "Eno"];
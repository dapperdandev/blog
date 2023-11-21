export class Counter {
    private static instance: Counter;
    private _count: number;

    public get count(): number {
        return this._count;
    }

    private constructor() {
        this._count = 0;
    }

    public static getInstance(): Counter {
        if (!Counter.instance) {
            Counter.instance = new Counter();
        }

        return Counter.instance;
    }

    public increment(): void {
        this._count++;
    }
}

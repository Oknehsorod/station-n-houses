interface House {
    neighbours: House[];
    isLightOn: boolean;
    provideLight(value: boolean): void
}

interface Station {
    addElectric(to: House): void;
    removeElectric(to: House): void;
    on(): void;
    off(): void;
}

class ElectricStation implements Station {
    protected isWork: boolean = false;
    protected houses: House[] = [];

    addElectric(to: House) {
        this.houses.push(to);
    }

    removeElectric(to: House) {
        this.houses = this.houses.filter(house => house !== to)
    }

    protected emit() {
        const provideE = (house: House) => {
            house.provideLight(this.isWork)
            house.neighbours.forEach(provideE)
        }
        this.houses.forEach(provideE)
    }

    on(): void {
        this.isWork = true
        this.emit();
    }

    off(): void {
        this.isWork = false
        this.emit();
    }
}

class RegularHouse implements House {
    neighbours: House[];
    isLightOn: boolean = false;

    constructor(neighbours: House[] = []) {
        this.neighbours = neighbours
    }

    provideLight(value: boolean) {
        this.isLightOn = value
    }
}
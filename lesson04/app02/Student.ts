export class Student {
    id: number;
    private name: string;
    #gpa: number;
    set gpa(gpa){
        this.#gpa = gpa;
    }
    get gpa(){
        return this.#gpa;
    }
    getName():string {
        return this.name;
    }
    constructor(id:number, name: string, gpa: number) {
        this.name = name;
        this.id = id;
        this.#gpa = gpa;
    }
}
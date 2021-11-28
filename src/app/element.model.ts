export class FormElement {
    public inputType: string;
    public label: string;
    public value: string;
    public options: string[];

    
    constructor(inputType:string="", label:string="", value:string="", options:string[]=[]){
        this.inputType = inputType;
        this.label = label;
        this.value = value;
        this.options = options;
    }
}
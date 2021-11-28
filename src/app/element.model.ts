export class FormElement {
    public label: string;
    public inputType: string;
    public value: string;
    public options: string[];

    
    constructor(label:string="", inputType:string="", value:string="", options:string[]=[]){
        this.label = label;
        this.inputType = inputType;
        this.value = value;
        this.options = options;
    }
}
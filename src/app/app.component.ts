import { Component } from '@angular/core';
import { FormElement } from "./element.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textInput:string = '';
  ELEMENT_TYPES = {
    "select": true,
    "text_input": true
  }

  rows!:FormElement[][];
  maxRows!:number;
  maxColumns!:number;

  onInputChange($event: any){
    this.textInput = $event.target.value;

    this.textParser();

    this.preRenderElements();
    
    console.log(this.rows);
  }


  propsValidator(props:FormElement){
    if (this.ELEMENT_TYPES.hasOwnProperty(props.inputType.toLowerCase())){
        if (props.inputType.toLowerCase() == 'select' && props.options[0] ==""){
          console.log("SELECT should have at least 1 option")
          return false;
        }
        if (props.inputType.toLowerCase() == 'text_input'){
          props.options = [];
        }
        
        return true;
    }
    return false;
  }

  textParser(){
    // LINE;COLUMN;LABEL;TYPE;VALUE
    var elementStrings!: string[];
    var elementProps!: string[];
    var tmpElement:FormElement;
    var i = 0;
    this.rows = [];
    this.maxColumns = 0;
    this.maxRows = 0;
    var row,column;

    elementStrings = this.textInput.split(/\r?\n/);
    for (; elementStrings.length > i; i++){
      elementProps = elementStrings[i].split(";");
      if (elementProps.length > 6 || elementProps.length < 3){
        continue;
      }
      
      elementProps[5] = elementProps[5] || ""; // fix option param
      tmpElement = new FormElement(
        elementProps[2] || "",
        elementProps[3] || "",
        elementProps[4] || "",
        elementProps[4].split(",")
      );

      row = parseInt(elementProps[0]) || -1;
      column = parseInt(elementProps[1]) || -1;
      if (row < 1 || column < 1){
        continue;
      }

      if (this.propsValidator(tmpElement)){
        if (this.maxRows < row){
          this.maxRows = row;
        }
        if (this.maxColumns < column){
          this.maxColumns = column;
        }
        if (!this.rows[row-1]){
          this.rows[row-1] = [];
        }
        this.rows[row-1][column-1] = tmpElement;
      }
    }
    
    if (this.rows.length) {
      console.log("Found " + this.rows.length + " valid rows declarations");
    } else
      console.log("Not found valid declarations");
  }
  preRenderElements(){
    var i, j, row;

    //completeData
    for (i=0; this.maxRows > i; i++){
      if ((row=this.rows[i]) == undefined){
        row = this.rows[i] = [];
      }
      for (j=0; this.maxColumns > j; j++){
        if (row[j] == undefined){
          row[j] = new FormElement();
        }
      }
    }
  }
}

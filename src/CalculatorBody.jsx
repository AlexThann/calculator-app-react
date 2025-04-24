
import { useReducer } from "react";
import "./CalcBody.css"





function CalculatorBody(){
    function reducer(state,action){
        switch (action.type) {
            case "add_digit":
                if(state.overwrite===true)
                    return{...state,previousOperator:`${action.digit}`,overwrite:false};
                if(state.operation==null){
                    if(state.previousOperator==null && action.digit===".") return state;
                    if ((state.previousOperator || "").includes(".") && action.digit === ".") return state;
                    if( state.previousOperator==="0" && action.digit ==="0") return state;
                    return {...state,previousOperator:`${state.previousOperator || ""}${action.digit}`};
                }else{
                    if(state.currentOperator==null && action.digit===".") return state;
                    if ((state.currentOperator || "").includes(".") && action.digit === ".") return state;
                    if( state.currentOperator==="0" && action.digit ==="0") return state;
                    return{...state,currentOperator:`${state.currentOperator || ""}${action.digit}`};
                }
            case "add_operator":
                if(state.previousOperator==null) return state;
                if(state.previousOperator!=null && state.currentOperator!=null) return {...state,previousOperator:evaluate(state),operation:action.digit,currentOperator:null};
                return{...state,operation:`${action.digit}`,overwrite:false};
            case "reset":
                return {previousOperator:null,operation:null,currentOperator:null,overwrite:false};
            case "delete_digit":
                if(state.overwrite===true)
                    return{previousOperator:null,operation:null,currentOperator:null,overwrite:false}
                if(state.currentOperator!=null){
                    return {...state,currentOperator:state.currentOperator.slice(0,-1)===""?null:state.currentOperator.slice(0,-1)};
                }else if(state.operation==null && state.previousOperator!=null){
                    return {...state,previousOperator:state.previousOperator.slice(0,-1)===""?null:state.previousOperator.slice(0,-1)};
                }
            case "equals":
                if(state.currentOperator!=null && state.operation!=null && state.previousOperator!=null)
                    return {...state,previousOperator:evaluate(state),operation:null,currentOperator:null,overwrite:true};
            default:
              return state;
          }
    }

    const INTEGER_FORMAT = new Intl.NumberFormat("en-us", {maximumFractionDigits:0})
    
    function formatNum(num){
        if(num==null) return
        const [integer,decimal] = num.split(".");
        if(decimal==null) return INTEGER_FORMAT.format(integer);
        return `${INTEGER_FORMAT.format(integer)}.${decimal}`;
    }
    function evaluate(state){
        const operator1=parseFloat(state.previousOperator);
        const operator2=parseFloat(state.currentOperator);
        switch(state.operation){
            case "+":
                return `${operator1+operator2}`;
            case "-":
                return `${operator1-operator2}`;
            case "x":
                return `${operator1*operator2}`;
            case "/":
                if(operator2!=0) return `${operator1/operator2}`;
                return "";
            default:
                return "";
        }
    }

    const [{previousOperator,operation,currentOperator,overwrite},dispatcher]=useReducer(reducer,{previousOperator:null,operation:null,currentOperator:null,overwrite:false});
    
    
    return (<>
        <div className="output">{formatNum(previousOperator)} {operation} {formatNum(currentOperator)}</div>
        <div className="numpad">
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_digit",digit:"7"})}>7</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_digit",digit:"8"})}>8</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_digit",digit:"9"})}>9</button>
            <button className="specialbtn"onClick={()=>dispatcher({type:"delete_digit"})}>DEL</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_digit",digit:"4"})}>4</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_digit",digit:"5"})}>5</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_digit",digit:"6"})}>6</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_operator",digit:"+"})}>+</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_digit",digit:"1"})}>1</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_digit",digit:"2"})}>2</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_digit",digit:"3"})}>3</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_operator",digit:"-"})}>-</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_digit",digit:"."})}>.</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_digit",digit:"0"})}>0</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_operator",digit:"/"})}>/</button>
            <button className="normalbtn" onClick={()=>dispatcher({type:"add_operator",digit:"x"})}>x</button>
            <button className="resetbtn specialbtn" onClick={()=>dispatcher({type:"reset"})}>RESET</button>
            <button className ="equalsbtn" onClick={()=>dispatcher({type:"equals"})}>=</button>
        </div>
    </>)
}

export default CalculatorBody;
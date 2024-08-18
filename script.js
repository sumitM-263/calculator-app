class Calculator{

    constructor(previousOperand,currentOperand){
        this.currentOperand=currentOperand
        this.previousOperand=previousOperand
        this.clear();
    }

    clear(){
        this.currentOperandText=""
        this.previousOperandText=""
        this.operation=undefined
    }

    delete(){
        this.currentOperandText=this.currentOperandText.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number==='.' && this.currentOperandText.includes('.')) return
        this.currentOperandText=this.currentOperandText.toString()+number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperandText==='') return
        if(this.previousOperandText!==''){
            this.compute()
        }
        this.operation=operation
        this.previousOperandText=this.currentOperandText
        this.currentOperandText="";
    }

    compute(){
        let computation
        const prev=parseFloat(this.previousOperandText)
        const current=parseFloat(this.currentOperandText)

        if(isNaN(prev)||isNaN(current)) return 

        switch(this.operation){

            case '+':
                computation=prev+current
                break

            case '-':
                computation=prev-current
                break
            
            case '÷':
                computation=prev/current
                break

            case '⨯':
                computation=prev*current
                break

            default:
                return 
        }
        this.currentOperandText=computation.toString()
        this.operation=undefined
        this.previousOperandText=''
    }

    getDisplayNumber(number){
        const stringNumber=number.toString()
        const integerDigits=parseFloat(stringNumber.split('.')[0])
        const decimalDigits=stringNumber.split('.')[1]

        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay=''
        }
        else{
            integerDisplay=integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0
            })
            
        }

        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperand.innerText=this.getDisplayNumber(this.currentOperandText)
        if(this.operation!==undefined){

            this.previousOperand.innerText=`${this.getDisplayNumber(this.previousOperandText)} ${this.operation}`

        }else{

            this.previousOperand.innerText='';
        }

    }
}


const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalsButton=document.querySelector('[data-equals]')
const allClearButton=document.querySelector('[data-all-clear]')
const previousOperand=document.querySelector('[data-previous-operand]')
const currentOperand=document.querySelector('[data-current-operand]')
const deleteButton=document.querySelector('[data-delete]')

const calculator=new Calculator(previousOperand,currentOperand)

numberButtons.forEach(button =>{

        button.addEventListener('click',()=>{
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        })
})

operationButtons.forEach(button =>{

        button.addEventListener('click',()=>{
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay()
        })
})

equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})


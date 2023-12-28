// --- TOGGLING COLOR SCHEME ---
// --- TOGGLING COLOR SCHEME ---

    // --- LOAD PREVIOUSLY USED theme. IF NO STORED theme, SET theme to 1
    let theme = localStorage.getItem("theme") || 1;
    // --- FUNCTION FOR TOGGLING COLOR SCHEME DEPENDING ON VALUE OF theme 
    const loadTheme = function(){
        if(theme==2){
        document.body.classList.add("lightMode");
    }
    else if(theme==3){
        document.body.classList.add("darkMode");
    }
    else{
        document.body.classList.remove("darkMode");
        document.body.classList.remove("lightMode");
    }
    }
    // --- SET COLOR SCHEME ON PAGELOAD
    loadTheme();
    // --- FUNCTION FOR CHANGING THEMES
    const selectTheme=function(){
    if(theme == 3){
        theme = 1;
        localStorage.setItem("theme",1);
        loadTheme();
    }
    else {
        theme++;
        localStorage.setItem("theme",theme);
        loadTheme();
    }
    }
    // --- selectTheme() is added as an "onclick" attribute to .toggleSwitch

// ------- E N D  OF COLOR SCHEME -------
// ------- E N D  OF COLOR SCHEME -------


// --- MAKING BUTTONS ADD THEIR VALUE TO THE INPUT FIELD ---
// --- MAKING BUTTONS ADD THEIR VALUE TO THE INPUT FIELD ---

let screen = document.querySelector(".screen");
let numbers = document.querySelectorAll(".number:not(.zero)");
let operands = document.querySelectorAll(".operand:not(.subtraction, .period)");

// EACH BUTTON HAS A value ATTRIBUTE SET TO ITS NUMBER
numbers.forEach(num => num.addEventListener("click",()=>{
    numberFunc(num.value)
}))
numbers.forEach(num => num.onclick=numberFunc(num.value))

numbers.forEach(num => num.addEventListener("touchend",()=>{
    numberFunc(num.value)
}))
// --- FUNCTION FOR NUMBERS 1 THROUGH 9 ---
// --- FUNCTION FOR NUMBERS 1 THROUGH 9 ---
const numberFunc = function (numKey){
    // IF THERE'S ONLY A 0, REPLACE IT
    if(screen.value==="0" && numKey!=0){
        screen.value=numKey
    }
    // IF INPUT ENDS IN -0,+0,*0,/0, replace the 0
    else if(/[-\+\/\*]0/.test(screen.value.slice(-2)) && numKey!=0){
        screen.value=screen.value.slice(0,-1)+numKey
    }
    else{
    screen.value += numKey
    }
}
// --- 0 NEEDS SPECIAL CONDITIONS ---
// --- 0 NEEDS SPECIAL CONDITIONS ---
let zero = document.querySelector(".zero");

zero.addEventListener("click",()=>{
    zeroFunc(zero.value);
})
// --- FUNCTION FOR 0 ---
// --- FUNCTION FOR 0 ---
const zeroFunc= function(numKey){
    // IF INPUT == 0, DON'T ADD MORE 0s
    if(screen.value=="0" && numKey==0){
        screen.value=0
    }
    // IF INPUT ENDS IN -0 +0 /0 *0, ADD NOTHING
    else if(/[-\+\/\*]0/.test(screen.value.slice(-2)) && numKey==0){
    return
    }
    else{screen.value+=0}
}
// --- OPERANDS +, * AND / ---
// --- OPERANDS +, * AND / ---
operands.forEach(operand => operand.addEventListener("click",(e)=>{
    operandFunc(operand.value)
}))
// --- FUNCTION FOR OPERANDS +, * AND / ---
// --- FUNCTION FOR OPERANDS +, * AND / ---
const operandFunc = function(sign){
    // IF INPUT IS EMPTY, ADD NOTHING
    if(screen.value==""){return}
    // IF INPUT ENDS IN - + * / OR . REPLACE IT
    else if(/[\-\+\*\/\.]/.test(screen.value.slice(-1))){
        screen.value=screen.value.slice(0,-1)+sign
    }else{
        screen.value+=sign
    }
}
// --- OPERAND "-" ---
// --- OPERAND "-" ---
let minus = document.querySelector(".subtraction");

minus.addEventListener("click",()=>{
    minusFunc()
})
// --- FUNCTION FOR "-" OPERAND ---
// --- FUNCTION FOR "-" OPERAND ---
const minusFunc = function(){
    // IF INPUT ENDS IN - + OR . REPLACE WITH -
    if(/[\-\+\.]/.test(screen.value.slice(-1))){
        screen.value=screen.value.slice(0,-1)+"-"
    }
    // IF INPUT ENDS WITH * / OR NUMBER, ADD -
    else{
        screen.value+="-"
    }
}

// --- "PERIOD" NEEDS SPECIAL CONDITIONS ---
// --- "PERIOD" NEEDS SPECIAL CONDITIONS ---
let period = document.querySelector(".period");
period.addEventListener("click",()=>{
    periodFunc()
})
// --- FUNCTION FOR "PERIOD" ---
// --- FUNCTION FOR "PERIOD" ---
const periodFunc = function(){
    if(screen.value=="" || screen.value=="0"){
        screen.value="0.";
    }
    // IF INPUT ENDS IN . ADD NOTHING
    else if(screen.value.slice(-1)=="."){
        return;
    }
    // IF TYPED AFTER A SIGN, AUTOMATICALLY ADD 0 BEFORE
    else if(/[\/\*\+\-]/.test(screen.value.slice(-1))){
        screen.value+="0.";
    }
    // PREVENT NUMBERS FROM HAVING 2 PERIODS
    else if(screen.value.lastIndexOf(".")!=-1 && /^\d+$/.test(screen.value.slice(screen.value.lastIndexOf(".")+1))){
        return
    }
    else {
        screen.value+=".";
    }

}
// --- FUNCTIONS FOR SPECIAL BUTTONS ---
// --- FUNCTIONS FOR SPECIAL BUTTONS ---

    // RESET INPUT SCREEN
    const resetFunc = function(){
        screen.value="";
    }
    // DELETE LAST DIGIT
    const deleteFunc=function(){
        screen.value = screen.value.slice(0,screen.value.length-1);
    }
    // DO MATH
    const equalsFunc = function (){
        screen.value == ""? "" :
        screen.value = eval(screen.value)
    }
    
// --- "RESET" BUTTON ---
// --- "RESET" BUTTON ---
let reset = document.querySelector(".reset");

reset.addEventListener("click",()=>{
    resetFunc()
})
// --- "DELETE" BUTTON ---
// --- "DELETE" BUTTON ---
let del = document.querySelector(".clear");

del.addEventListener("click",()=>{
    deleteFunc()
})

// --- "EQUALS" BUTTON ---
// --- "EQUALS" BUTTON ---
let equals = document.querySelector(".equals");
equals.addEventListener("click",()=>{
    equalsFunc()
})

// --- M A P P I N G   K E Y P R E S S E S ---
// --- M A P P I N G   K E Y P R E S S E S ---

document.addEventListener("keydown",(e)=>{
    // IF PRESSED KEY ISN'T A BUTTON ON THE CALCULATOR, DO NOTHING
    if(!/[0123456789\.\+\-\*\/]|Enter|Backspace|Delete/.test(e.key)){
        return
    }else if(/Enter|Backspace|Delete/.test(e.key)){
        e.key=="Delete"? resetFunc() :
        e.key=="Backspace" ? deleteFunc() :
        equalsFunc();
    }
    else if(e.key==0){
        zeroFunc(e.key);
    }
    else if (e.key>=1 && e.key <= 9){
        numberFunc(e.key);
    }
    else if(e.key=="-"){
        minusFunc();
    }
    else if(e.key=="."){
        periodFunc()
    }
    else{
        operandFunc(e.key);
    }
    ;
    // ADD CSS CLASS TO PRESSED BUTTON
    document.querySelector(`button[value='${e.key}']`).classList.add("active")
})

// --- REMOVE CSS CLASS AFTER PRESSING BUTTON ---
// --- REMOVE CSS CLASS AFTER PRESSING BUTTON ---
document.addEventListener("keyup",(e)=>{
    document.querySelector(`button[value='${e.key}']`).classList.remove("active")
})



import OPERATIONS from "./services/polloperations.js";
window.addEventListener('load',bindevents);
function bindevents(){
    document.getElementById('choose').addEventListener(
        'click',
        createpollbox
    )
    document.getElementById('create').addEventListener(
        'click',
        takeinput
    )
}
function createpollbox(){
    const polltype = document.getElementById('polltype').value;
    console.log(polltype)
    if(polltype == 'Truefalse'){
        printinputbox('2')
    }
    if(polltype==2){
        printinputbox('2');
    }
    if(polltype==3){
        printinputbox('3');
    }
    if(polltype==4){
        printinputbox('4');
    }
    if(polltype=='custom'){
        let val =  prompt("Enter no. of input box");
        if(val>=5&&val<=12){
            printinputbox(val);
        }
        else{
            alert("Please Enter only Number");
        }
    }
}
const questionsbox = document.getElementById('questionsbox');
function printinputbox(inp){
    questionsbox.innerHTML= null;
    for (let i = 0; i < inp; i++) {
        let newinp = document.createElement('input');
        newinp.classList.add('form-control');
        newinp.classList.add('mt-3');
        newinp.setAttribute('id',`ans${i+1}`);
        newinp.setAttribute('placeholder',`Type answer ${i+1}`);
        questionsbox.appendChild(newinp);
    }
}
function takeinput(){
    let obj={}
    document.querySelectorAll('input').forEach(e=>{
        if(e.value==""){
            alert("Please Fill All The Fields  ");
            return;
        }
        else{
            obj[e.id]=e.value
            e.value = null;
        }
    });
    openresult(obj);
}
function openresult(urldata){
    const url = 'resultpage.html?';
    const searchparams = new URLSearchParams();
    for (const key in urldata) {
        searchparams.set(key,urldata[key]);   
    }
    window.open(url+searchparams.toString());
   
    
}
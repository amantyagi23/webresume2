window.addEventListener('load',bindevents);
function geturl(){
    return window.location.search
}
const isdone = false;
function bindevents(){
  
    loadresults(geturl());
    document.getElementById('submit').addEventListener(
        'click',
        ()=>{
            if(localStorage.isdone){
                alert("You can vote only one time....");
                // localStorage.clear();
            }
            else{
                localStorage.isdone = true;
                saveresult();
                
            }
        }
    )
}

function loadresults(url){
    const searchparams = new URLSearchParams(url);
    for (let pair of searchparams.entries()) {
        if(pair[0]=='question'){
            const question =  searchparams.get('question');
            printques(question);
        }
        else{
            printans(pair[1],pair[0]);
        }
    }
}
function printques(question){
    document.getElementById('resultbox').innerHTML=`
    <input type="text" class="form-control mt-5 overflow-scroll" value="${window.location.href}" readonly>
    <span class="heading">
        ${question}
    </span>
    `;
}
const ansbox = document.getElementById('ans');
function printans(ans,pos){
    const inp = document.createElement('div');
    inp.classList.add('form-control');
    inp.innerHTML = `
    <label for="ans${pos}">${ans}</label>
    <input type="radio" name="ans" id="${pos}" value="${ans}">
    `;
    ansbox.appendChild(inp);
}
function saveresult(){
    const arr ={};
    document.getElementById('ans').querySelectorAll('input').forEach(e=>{
        if(e.checked){
            arr[e.value] = 100;
            e.checked = "";
        }
        else{
            arr[e.value] = 0;
        }
    });
    console.log(arr);
   showresult(arr);
}
function showresult(arr){
    const chart = document.getElementById('chart').querySelector('.d-flex');
    chart.innerHTML = "";
    let i= 0;
    for (const key in arr) {
        const bar = document.createElement('div');
        bar.classList.add('graph');
        bar.setAttribute('id' ,`result${i+1}`);
        bar.setAttribute('data-value',arr[key]);
        bar.setAttribute('value',key)
        chart.appendChild(bar);
        i=i+1;
    }
    makechart();
}
function makechart(){
  let leftvalue = 0;
    document.getElementById('chart').querySelectorAll('.graph').forEach(
        (e)=>{
            const value =  e.getAttribute('data-value');
            document.getElementById(e.id).style.height = value+"px";
            document.getElementById(e.id).style.left= leftvalue+ "px";
            e.innerHTML = e.getAttribute('value') + "  "+value+"% votes";
            leftvalue = leftvalue + 105;
        }
    )
}
function swap(ele1, ele2)
{
    const style1=window.getComputedStyle(ele1);
    const style2=window.getComputedStyle(ele2);

    const transform1=style1.getPropertyValue("height");
    const transform2=style2.getPropertyValue("height");

    ele1.style.height=transform2;
    ele2.style.height=transform1;
}

function check(ele1,ele2){
    const style1=window.getComputedStyle(ele1);
    const style2=window.getComputedStyle(ele2);

    const transform1=style1.getPropertyValue("height");
    const transform2=style2.getPropertyValue("height");
    a=parseFloat(transform1);
    b=parseFloat(transform2);
    if(a>b)
    return true;
    else
    return false;

}

function resolveAfterSeconds() {
    x=document.getElementById("sort_sp").value;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 210-x);
    });
  }

async function bubble(){
    const elem=document.getElementById("bars");
    const n=elem.children.length;
    //console.log(elem.children);
    for(let i=0;i<n;i++)
    {
        let flag=false;
        for(let j=0;j<n-1;j++)
        {
            
            if(check(elem.children[j],elem.children[j+1]))
            {
                //console.log(j,j+1,elem.children[j],elem.children[j+1])
                flag=true;
                ele1=elem.children[j];
                ele1.style.background="red";
                ele2=elem.children[j+1];
                ele2.style.background="red";
                await resolveAfterSeconds();
                swap(ele1,ele2);
                ele1.style.background="yellow";
                ele2.style.background="yellow";
            }
            
        }
        elem.children[elem.children.length-i-1].style.background='green';
        if(!flag){
            for(let j=0;j<=i;j++)
            {
                elem.children[j].style.background='green';
            }
            break;
        }

    }
    //console.log(elem.children.item());
}

async function selection(){
    const elem=document.getElementById("bars");
    const n=elem.children.length;
    for(let i=0;i<n;i++)
    {
        for(let j=i+1;j<n;j++)
        {
            ele1=elem.children[i];
            ele2=elem.children[j];
            if(check(ele1,ele2))
            {
                ele1.style.background='red';
                ele2.style.background='red';
                await resolveAfterSeconds();
                swap(ele1,ele2);
                ele1.style.background='yellow';
                ele2.style.background='yellow';
            }
        }
        elem.children[i].style.background='green';
    }
}

async function insertion(){
    const elem=document.getElementById("bars");
    const n=elem.children.length;
    for(let i=1;i<n;i++)
    {
        ele1=elem.children[i];
        ele1_ht=ele1.style.height;
        let j=i-1;
        ele1.style.background='blue';
        while(j>=0 && parseFloat(elem.children[j].style.height)>parseFloat(ele1_ht))
        {
            def=elem.children[j+1].style.background;
            elem.children[j].style.background='red';
            elem.children[j+1].style.background='red';
            await resolveAfterSeconds();
            elem.children[j+1].style.height=elem.children[j].style.height;
            elem.children[j].style.background='yellow';
            elem.children[j+1].style.background=def;
            j--;
        }
        elem.children[j+1].style.height=ele1_ht;
    }
    i=elem.children.length-1;
    while(i>=0)
    {
        await resolveAfterSeconds();
        elem.children[i].style.background='green';
        i--;
    }
    console.log(elem.children);
}

async function merge(){
    let arr=[];
    n=elem.children.length;
    for(let i=0;i<n;i++)
    {
        arr.push(elem.children[i]);
    }
    mergeUtil(arr,n);

}

async function merging(left,right,n){
    let ans=[];
    while(left.length && right.length)
    {
        left[0].style.background='red';
        right[0].style.background='red';
        await resolveAfterSeconds();
        if(left[0]>right[0]){
            ele=right.shift();
            ans.push(ele);
            ele.style.background='yellow';
        }
        else{
            ele=left.shift();
            ans.push(ele);
            ele.style.background='yellow';
        }
    }
    return [...ans,...left,...right];
}

function mergeUtil(arr,n)
{
    const half= arr.length/2
    if(half<2){
        return arr
    }

    const left=arr.splice(0,half);
    return merging(mergeUtil(left),mergeUtil(arr));
}

function foo()
{
    let i=0;
    let arr=[];
    const elem=document.getElementById("bars");
    const lim=document.getElementById('arr_sz').value;
    //console.log(lim);
    //console.log(elem.hasChildNodes());
    while(elem.hasChildNodes())
    {
        elem.removeChild(elem.firstChild);
      
    }
    while(i<lim)
    {
        let x=Math.random()*lim;
        arr.push(Math.floor(x));
        let bar=document.createElement("div");
        bar.classList.add("bar");
        i++;
        bar.style.height= `${x*3.5}px`;
        bar.style.width= "5%";
        //console.log(bar.style.height);
        elem.appendChild(bar);
        //console.log(elem)
    }
    }
    //console.log(elem.childNodes.length);
    

    //console.log(arr);
let arr_size=document.querySelector("#arr_sz");
arr_size.addEventListener("input",foo);

document.getElementById("array").
        addEventListener("click",foo);

document.getElementById("bubble").
        addEventListener("click",bubble);

document.getElementById("select").
        addEventListener("click",selection);

document.getElementById("insertion").
        addEventListener("click",insertion);
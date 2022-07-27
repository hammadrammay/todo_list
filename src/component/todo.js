import React, { useState,useEffect,useRef } from 'react'
import "./style.css"


const getLocalData=()=>{
    const lists=localStorage.getItem("todolistdata");
    if(lists){

        return JSON.parse(lists);
    }
    else{
        return [];
    }
};



export const Todo = () => {
    const [inputdata,setInputdata]=useState("");
    const [item, setitem] = useState(getLocalData());
    const [edit, setedit] = useState("");
    const [toggleBtn, settoggleBtn]=useState(false);
    const inputRef=useRef(null);

    const additems=()=>{
        if(!inputdata)
        {
            alert("Please write something")
        }
        else if(inputdata && toggleBtn)
        {
        setitem(
            item.map((curElement)=>{
                  if (curElement===edit){
                      return [inputdata];
                  }
                  else{
                      return curElement;
                  }})
        );
        setInputdata("");
        settoggleBtn(false);
        setedit(null);
        }

        else{
            
setitem([...item,inputdata]);
setInputdata("");
        }
    }

    const dltitem=(index)=>{
const updateitems=item.filter((update)=>{
   return update!==index;
})
setitem(updateitems);
setInputdata("");
    }

    const removeall=()=>{
        setitem([]);
    }
const editElement=(index)=>{
    inputRef.current.focus();
    const editdata=item.find((curElement)=>{
        return curElement===index;     

    });
    
    setInputdata(editdata);
settoggleBtn(true);
setedit(index);
}



    useEffect(() => {
        localStorage.setItem("todolistdata",JSON.stringify(item));
    }, [item]);




    return (
        <>
        <div className="container">
        <figure>
        <img src="images/todo.png" alt="image loading" className='icon' />
        </figure>
                 <figcaption>Add your list here 📝 </figcaption>
                 <div className='items'>
           <input type="text" name="" id="input" placeholder=' ✍ Add Items'
            ref={inputRef}
               value={inputdata}
               onChange={(event)=>setInputdata(event.target.value)}
           />
            {
                toggleBtn ? <i className="fa fa-edit icon" onClick={()=>additems()}
            
                ></i> :
                <i className="fa fa-plus icon" onClick={()=>additems()}></i>
               
                           }

           </div>
       
               
        {item.map((curElement)=>{
            return             <div className='show-items' >     
<span id="item-name"> {curElement} </span>
<div>
<i className="fa fa-edit icon" onClick={()=>editElement(curElement)}
></i>
<i className="fa fa-trash icon" onClick={()=>dltitem(curElement)} ></i>
</div>
 </div>  
        })}
                       
           <button className='btn' onClick={()=>{removeall()}}>  Remove All </button>
                 </div>
                 </>
    )
}







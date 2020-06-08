var checkboxs=document.querySelectorAll("#delete1 #task input");
var taskDescpt=document.getElementsByClassName("task-des");
var taskDate=document.getElementsByClassName("task-date");



for(let i=0;i<checkboxs.length;i++)
{
    checkboxs[i].addEventListener("click",function()
    {   //if checkbox is checked then add linethrough
        if(checkboxs[i].checked)
        {
            taskDescpt[i].classList.add("linethrough");
            taskDate[i].classList.add("linethrough");
        }//else remove the linethrough
        else
        {
            taskDescpt[i].classList.remove("linethrough");
            taskDate[i].classList.remove("linethrough");
        }
    })
    
}


// ---- Display notification on adding/deleting tast----
const notifyContainer = document.getElementById('notify'); 

    function notification(type){ //--- type define is task deleting/Adding
        if (type === 'error') {
            notifyContainer.classList.remove('notify-success');
            notifyContainer.classList.add('notify-error');
            notifyContainer.innerText = "Task Deleted!!!";
        }else if(type==='deleteAll'){
            notifyContainer.classList.remove('notify-success');
            notifyContainer.classList.add('notify-error');
            notifyContainer.innerText = "Task's Deleted Successfully!!";
        }else if (type === 'success') {
            notifyContainer.classList.remove('notify-error');
            notifyContainer.classList.add('notify-success');
            var check=document.getElementById("form-description").value; //---- to check is input field is empty
            if(check){
                notifyContainer.innerText = "Task Added successfully";
            }else{
                notifyContainer.classList.remove('notify-success');
                notifyContainer.classList.add('notify-error');
                notifyContainer.innerText = "Input Field's can't be empty!!";
            }
        }
        notifyContainer.style.display = 'block';

        setTimeout(() => {    //---- show notification only for 1 sec
            notifyContainer.style.display = 'none';
        }, 1000)
    }
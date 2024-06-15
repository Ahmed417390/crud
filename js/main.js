

var siteNameInput= document.getElementById('siteName')
var siteUrlInput= document.getElementById('siteUrl')
var AddBtn= document.getElementById('SubBtn')
var UpdateBtn= document.getElementById('UpBtn')
var sitesArray =[]
if(localStorage.getItem('sitesContainer') !=null){
    sitesArray = JSON.parse( localStorage.getItem('sitesContainer') )
    disPlaySites() 
}

function AddSite(){

if (  validationInput(siteNameInput,'msName')== true  && validationInput(siteUrlInput,'msUrl')==true ){
    var site ={
        name:siteNameInput.value,
        url:siteUrlInput.value
    }
    sitesArray.push(site)
    localStorage.setItem('sitesContainer',JSON.stringify(sitesArray)) 
    disPlaySites() 
    clearInput()

} 
   
 } 


function disPlaySites(){
    var arrow=""
    for(var i=0; i<sitesArray.length;i++){
        arrow +=`
           <tr>
          <td> ${i+1}</td>
          <td>${sitesArray[i].name} </td>
          <td> <a class="btn btn-success " href="" onclick="openLink()" target="_blank" class="me-1"><i class="fa-solid fa-eye"></i> visit</a> </td>
                    <td> <button onclick="setUpdate(${i})" class="btn btn-primary" ><i class="fa-solid fa-pen-fancy me-1"></i>Update</button> </td>

          <td> <button onclick=" deleteSite(${i})" class="btn btn-danger" ><i class="fa-solid fa-trash  me-1"></i>Delete</button> </td>
        </tr>
        `
    }
    document.getElementById('tabelData').innerHTML= arrow
}


function deleteSite(index){
    sitesArray.splice(index,1)
    localStorage.setItem('sitesContainer',JSON.stringify(sitesArray))
    disPlaySites()
}



function validationInput(element,msg){
var regex ={
    siteName: /^\w{3,}(\s+\w+)*$/  ,
    siteUrl: /^(http|https):\/\/[^\s]+$/
}
var text= element.value
        msNameP=document.getElementById(msg)
        if(regex[element.id].test(text) == true){
           element.classList.remove('is-invalid')
           element.classList.add('is-valid')
            msNameP.classList.add('d-none')
            return true
            }else{
               element.classList.remove('is-valid')
               element.classList.add('is-invalid')
                msNameP.classList.remove('d-none')
                return false
}
}
function clearInput(){
    siteNameInput.value=null
    siteUrlInput.value=null
}
function openLink(){
    var siteUrl = siteUrlInput.value
    window.open(siteUrl, '_blank')
}


function setUpdate(indexNumber){
   
    siteNameInput.value = sitesArray[indexNumber].name
    siteUrlInput.value= sitesArray[indexNumber].url
    AddBtn.classList.add('d-none')
    UpdateBtn.classList.remove('d-none')

    number= indexNumber
}

function updateData(){
    var site ={
        name:siteNameInput.value,
        url:siteUrlInput.value
    }
    sitesArray.splice(number,1,site)
    localStorage.setItem('sitesContainer',JSON.stringify(sitesArray)) 
    disPlaySites() 
    clearInput()
    AddBtn.classList.remove('d-none')
    UpdateBtn.classList.add('d-none')
}
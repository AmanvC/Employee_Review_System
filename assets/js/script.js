function showContainer(adid, role){
    let emp = document.getElementsByClassName(`more-details ${adid}`)[0];
    let allEmps = document.querySelectorAll('.more-details');
    allEmps.forEach(x => {
        if(x != emp){
            x.style.display = 'none'
        }
    })
    emp.style.display = 'block'
    let btn = document.getElementById(`${role}`);
    btn.checked = true;
}

// function changeDeleteWrapperDisplay(){
//     let x = document.getElementById('delete-wrapper');
//     if(x.style.display == "block"){
//         console.log('Inside IF')
//         x.style.display = "none";
//     }else{
//         console.log('Inside Else')
//         x.style.display = "block";
//     }
// }
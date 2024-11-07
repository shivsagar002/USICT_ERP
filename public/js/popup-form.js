const cross = document.querySelectorAll('.popup-form .fa-square-xmark');
const popupForm = document.querySelectorAll('.popup-form');

cross.forEach((e) =>{
    e.addEventListener('click', ()=>{
        popupForm.forEach((e)=>{
            if(e.classList.contains("active")) {
                e.classList.remove('active');
            }
        });
    });
});


const popupButton = document.querySelectorAll('.popup-btn');
popupButton.forEach((button) => {
    button.addEventListener('click', ()=>{
        if(button.classList.contains('add-admin')){
            document.querySelector('.popup-form.admin-add').classList.add('active');
        }
        else if(button.classList.contains('add-teacher')){
            document.querySelector('.popup-form.teacher-add').classList.add('active');
        }
        else if(button.classList.contains('add-student')){
            document.querySelector('.popup-form.student-add').classList.add('active');
        }
        else if(button.classList.contains('add-course')){
            document.querySelector('.popup-form.course-add').classList.add('active');
        }
        else if(button.classList.contains('add-time-table')){
            document.querySelector('.popup-form.time-table-add').classList.add('active');
        }
        else if(button.classList.contains('add-notice')){
            document.querySelector('.popup-form.notice-add').classList.add('active');
        }
        else if(button.classList.contains('add-event')){
            document.querySelector('.popup-form.event-add').classList.add('active');
        }
    });
});

const myDateInput = document.querySelectorAll('.date');
const today = new Date();
myDateInput.forEach(e=>{
    e.value = today.toISOString().slice(0,10);
});


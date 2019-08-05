const purpose = document.getElementById('purposeVisit');
const userName = document.getElementById('userName');
const date = document.getElementById('date');
const comment = document.getElementById('comment');
const pressure = document.getElementById('pressure');
const indexWeight = document.getElementById('indexWeight');
const illness = document.getElementById('illness');
const age = document.getElementById('age');
const lastDateVisit = document.getElementById('lastDateVisit');
const sel = document.getElementById('select');

class Visit {
    constructor(purposeVisit, fullName, dateVisit, comment) {
        this._purposeVisit = purposeVisit;
        this._fullName = fullName;
        this._dateVisit = dateVisit;
        this._comment = comment;
    }
    open() {
        const overlay = document.getElementById('back');
        overlay.classList.add('modal-overlay');
        const modal = document.getElementById('modal');
        modal.style.display = 'flex';
    }
    close() {
        const overlay = document.getElementById('back');
        overlay.classList.remove('modal-overlay');
        const modal = document.getElementById('modal');
        modal.style.display = "none";
        const inputs = document.getElementsByClassName('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        document.getElementById('select').options[0].selected = 'selected';
        lastDateVisit.style.display = 'none';
        age.style.display = 'none';
        pressure.style.display = 'none';
        indexWeight.style.display = 'none';
        illness.style.display = 'none';
    }
    static hiddenInput () {
        pressure.style.display = 'none';
        indexWeight.style.display = 'none';
        illness.style.display = 'none';
        age.style.display = 'none';
        lastDateVisit.style.display = 'none';
    }
     checkDoctor() {
        if(sel.options[sel.selectedIndex].text === 'Кардиолог' ) {
            pressure.style.display = 'block';
            indexWeight.style.display = 'block';
            illness.style.display = 'block';
            age.style.display = 'block';
            lastDateVisit.style.display = 'none';
        }
        if(sel.options[sel.selectedIndex].text === 'Терапевт' ) {
            age.style.display = 'block';
            pressure.style.display = 'none';
            indexWeight.style.display = 'none';
            illness.style.display = 'none';
            lastDateVisit.style.display = 'none';
        }
        if(sel.options[sel.selectedIndex].text === 'Дантист' ) {
            lastDateVisit.style.display = 'block';
            age.style.display = 'none';
            pressure.style.display = 'none';
            indexWeight.style.display = 'none';
            illness.style.display = 'none';
        }
    }
    createVisit(){
        let divCard = document.createElement("div");
        divCard.innerHTML = `<p>${userName.value}</p>
        <p class="doctor">${select.value}</p>
        <p class="visit-visible">Цель визита: ${purpose.value}</p>
        <p class="visit-visible">Дата визита: ${date.value}</p>
        <p class="visit-cardio-visible">Давление: ${pressure.value}</p>
        <p class="visit-cardio-visible">Индекс маси тела: ${indexWeight.value}</p>
        <p class="visit-cardio-visible">Заболевания: ${illness.value}</p>
        <p class="visit-age-visible">Возраст: ${age.value}</p>
        <p class="visit-dantist-visible">Дата последнего визита: ${lastDateVisit.value}</p>
        <p class="visit-visible">Комментарий: ${comment.value}</p>
        <button id="closeCard" class="close-card">x</button>
        <button class='showMore'>Показать больше...</button>`;
        divCard.classList.add("main-card");
        divCard.setAttribute("number", localStorage.getItem("cart-size"));
        document.getElementById("mainCardId").appendChild(divCard);
        showText('mainCardId');
        addCartItem(divCard);
    }
}

function visibleMove (btn){
    const parentEl = btn.parentElement;
    const showAge = parentEl.getElementsByClassName('visit-age-visible');
    btn.style.display = "none";
    const elemCard = parentEl.getElementsByClassName('visit-visible');
    for (let i = 0; i < elemCard.length; i+1) {
        elemCard[i].classList.remove('visit-visible');
    }
    if(parentEl.getElementsByClassName('doctor')[0].textContent === 'Кардиолог' ) {
        const showCardio = parentEl.getElementsByClassName('visit-cardio-visible');
        for (let j = 0; j < showCardio.length; j+1) {
            showCardio[j].classList.remove('visit-cardio-visible');
        }
        for (let j = 0; j < showAge.length; j+1) {
            showAge[j].classList.remove('visit-age-visible');
        }
    }
    else if(parentEl.getElementsByClassName('doctor')[0].textContent === 'Терапевт' ) {
        for (let j = 0; j < showAge.length; j+1) {
            showAge[j].classList.remove('visit-age-visible');
        }
    }
    else if(parentEl.getElementsByClassName('doctor')[0].textContent === 'Дантист' ) {
        const showDantist =parentEl.getElementsByClassName('visit-dantist-visible');
        for (let j = 0; j < showDantist.length; j+1) {
            showDantist[j].classList.remove('visit-dantist-visible');
        }
    }
}

Visit.hiddenInput();
const modalVisit = new Visit();

const button = document.getElementById("createModal");
document.addEventListener('click', function(event) {

    if(event.target.classList.contains('close-card')) {
        const divCard = event.target.parentNode;
        const dataNumber = +divCard.getAttribute("number");
        localStorage.removeItem(`cart-item-${dataNumber+1 || 1}`);
        divCard.remove();
        showText('mainCardId');
    }

    if(event.target.classList.contains('showMore')) {
        visibleMove(event.target);
    }

    const modal = document.getElementById('modal');
    if (!modal.contains(event.target) && !button.contains(event.target)) {
        modalVisit.close();
    }
});

button.addEventListener("click", modalVisit.open.bind(modalVisit));

class Cardiologist extends Visit {
    constructor(purposeVisit, normalPressure, massIndex, pastIllnesses, age,  fullName, dateVisit, comment) {
        super(purposeVisit, fullName, dateVisit, comment);
        this._normalPressure = normalPressure;
        this._massIndex = massIndex;
        this._pastIllnesses = pastIllnesses;
        this._age = age;
    }

}
class Therapist extends Visit {
    constructor(purposeVisit, age, fullName, dateVisit, comment) {
        super(purposeVisit, fullName, dateVisit, comment);
        this._age = age;
    }
}
class Dentist extends Visit {
    constructor(purposeVisit, lastDate, fullName, dateVisit, comment) {
        super(purposeVisit, fullName, dateVisit, comment);
        this._lastDate = lastDate;
    }
}

let newVisit;
document.getElementById("createVisit").addEventListener('click', function () {

    if(select.value ==='Дантист') {
        if (purpose.value !== "" && lastDateVisit.value !== "" && userName.value !== "" &&
            date.value !== "") {
            newVisit = new Dentist(purpose.value, lastDateVisit.value, userName.value,
                date.value, comment.value);
            newVisit.createVisit();
        } else {
            alert('Попребуйте еще раз! Для записи к врачу нужно заполнить все поля!')
        }
    }
    if(select.value ==='Терапевт') {
        if (purpose.value !== "" && age.value !== "" && userName.value !== "" && date.value !== "") {
            newVisit = new Therapist(purpose.value, age.value, userName.value,
                date.value, comment.value);
            newVisit.createVisit();
        } else {
            alert('Попребуйте еще раз! Для записи к врачу нужно заполнить все поля!')
        }
    }
    if(select.value ==='Кардиолог') {
        if (purpose.value !== "" && pressure.value !== "" && indexWeight.value !== "" && illness.value !== "" && age.value !== "" && userName.value !== "" && date.value !== "") {
            newVisit = new Cardiologist(purpose.value, pressure.value, indexWeight.value,
                illness.value, age.value, userName.value, date.value, comment.value);
            newVisit.createVisit();
        } else {
            alert('Попребуйте еще раз! Для записи к врачу нужно заполнить все поля!')
        }

    }
    modalVisit.close();
});

function addCartItem(itemId) {
    let count = parseInt(localStorage.getItem('cart-size')) || 0;
    localStorage.setItem('cart-item-' + (count + 1), itemId);
    localStorage.setItem('cart-size', count + 1);
}

function showText(id) {
    const elemCont = document.getElementById(id);

    if ((elemCont.hasChildNodes())){
        const mainText = document.getElementById('main-text');
        mainText.style.display = "none";
    } else {
        const mainText = document.getElementById('main-text');
        mainText.style.display = "block";
    }
}

showText('mainCardId');
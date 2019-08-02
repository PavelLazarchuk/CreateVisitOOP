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
        const mainText = document.getElementById('main-text');
        mainText.style.display = 'none';
        const modal = document.getElementById('modal');
        modal.style.display = 'flex';
    }
    close() {
        const overlay = document.getElementById('back');
        overlay.classList.remove('modal-overlay');
        const mainText = document.getElementById('main-text');
        mainText.style.display = 'block';
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
<p id="doctor">${select.value}</p>
<p class="visit-visible">Цель визита: ${purpose.value}</p>
<p class="visit-visible">Дата визита: ${date.value}</p>
<p class="visit-cardio-visible">Давление: ${pressure.value}</p>
<p class="visit-cardio-visible">Индекс маси тела: ${indexWeight.value}</p>
<p class="visit-cardio-visible">Заболевания: ${illness.value}</p>
<p class="visit-age-visible">Возраст: ${age.value}</p>
<p class="visit-dantist-visible">Дата последнего визита: ${lastDateVisit.value}</p>
<p class="visit-visible">Комментарий: ${comment.value}</p>
<button id="closeCard" class="close-card" onclick="modalVisit.closeOneCard()">x</button>
<button id='showMore' onclick="modalVisit.visibleMove()">Показать больше...</button>`;
        divCard.classList.add("main-card");
        document.getElementById("mainCardId").appendChild(divCard);
    }
    visibleMove (){
        const showMore = document.getElementById('showMore');
        const showCardіo = document.getElementsByClassName('visit-cardio-visible');
        const showAge = document.getElementsByClassName('visit-age-visible');
        showMore.style.display = "none";
        const elemCard = document.getElementsByClassName('visit-visible');
        for (let i = 0; i < elemCard.length; i+1) {
            console.log(elemCard[i]);
            elemCard[i].classList.remove('visit-visible');
        }
        if(document.getElementById('doctor').textContent === 'Кардиолог' ) {
            for (let j = 0; j < showCardіo.length; j+1) {
                console.log(showCardіo[j]);
                showCardіo[j].classList.remove('visit-cardio-visible');
            }

            showAge.classList.remove('visit-age-visible');
        }
        if(document.getElementById('doctor').textContent === 'Терапевт' ) {
            showAge.classList.remove('visit-age-visible');
        }
        if(document.getElementById('doctor').textContent === 'Дантист' ) {
            showAge.classList.remove('visit-dantist-visible');
        }

    }
    closeOneCard() {

    }
}
Visit.hiddenInput();
const modalVisit = new Visit();

const button = document.getElementById("createModal");
document.addEventListener('click', function(event) {
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
        newVisit = new Dentist(purpose.value, lastDateVisit.value, userName.value,
            date.value, comment.value);
        newVisit.createVisit();
        console.log(newVisit);
    }
    if(select.value ==='Терапевт') {
        newVisit = new Therapist(purpose.value, age.value, userName.value,
            date.value, comment.value);
        newVisit.createVisit();
    }
    if(select.value ==='Кардиолог') {
        newVisit = new Cardiologist(purpose.value, pressure.value, indexWeight.value,
            illness.value, age.value, userName.value, date.value, comment.value);
        newVisit.createVisit();
        console.log(newVisit);
    }
    modalVisit.close();

});



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
        divCard.innerHTML = `<p>${userName.value}</p><p>${sel.options[sel.selectedIndex].text}</p><p>Цель визита: ${purpose.value}</p>
<p>Дата визита: ${date.value}</p><p>Комментарий: ${comment.value}</p><p>Давление: ${pressure.value}</p><p>Индекс маси тела: ${indexWeight.value}</p><p>Заболевания: ${illness.value}</p><p>Возраст: ${age.value}</p><p>Дата последнего визита: ${lastDateVisit.value}</p><button onclick="modalVisit.visibleMove()">Показать больше...</button>`;
        divCard.classList.add("main-card");
        document.getElementById("mainCardId").appendChild(divCard);
    }
    visibleMove (){

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
        console.log(newVisit);
    }
    if(select.value ==='Терапевт') {
        newVisit = new Therapist(purpose.value, age.value, userName.value,
            date.value, comment.value);
        console.log(newVisit);
    }
    if(select.value ==='Кардиолог') {
        newVisit = new Cardiologist(purpose.value, pressure.value, indexWeight.value,
            illness.value, age.value, userName.value, date.value, comment.value);
        console.log(newVisit);
    }
    modalVisit.close();
    modalVisit.createVisit();
});



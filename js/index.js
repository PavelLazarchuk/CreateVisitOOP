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
    constructor(purposeVisit, dateVisit, fullName, comment) {
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

    }
    static hiddenInput () {
        pressure.style.display = 'none';
        indexWeight.style.display = 'none';
        illness.style.display = 'none';
        age.style.display = 'none';
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

    }
}
Visit.hiddenInput();
const modal = new Visit(purpose, date, userName, comment);

const button = document.getElementById("createModal");
button.addEventListener("click", modal.open.bind(modal));

class Сardiologist extends Visit {
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

// const purpose = document.getElementById('purpose').value
// let newVisit
// if(select.value ==='dantist') newVisit = new Dentist(purpose)

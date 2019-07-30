class Visit {
    constructor(purposeVisit, dateVisit, fullName, comment) {
        this._purposeVisit = purposeVisit;
        this._fullName = fullName;
        this._dateVisit = dateVisit;
        this._comment = comment;
        // const div = document.createElement('div');
        // div.id = id;
        // div.innerHTML = (content);
        // div.classList.add('modal-modal');
        // this.div = div;
    }
    open() {
        const overlay = document.getElementById('back');
        overlay.classList.add('modal-overlay');
        const mainText = document.getElementById('main-text');
        mainText.style.display = 'none';
        const modal = document.getElementById('modal');
        modal.style.display = 'flex';

        // document.body.appendChild(this.div);
    }
    close() {
        const overlay = document.getElementById('back');
        overlay.classList.remove('modal-overlay');
        const modalWindow = document.getElementById('modal');
        modalWindow.remove();
    }
    createVisit(){

    }
}
const modal = new Visit("", "modal");

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
// ButtonCreate.addEventListener('click', );
// ButtonAddCard.addEventListener('click', );

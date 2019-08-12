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
let arrCard = JSON.parse(localStorage.getItem('item')) ? JSON.parse(localStorage.getItem('item')) : [];

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
    static createCard (userName, select, purpose, date, pressure, indexWeight, illness, age, lastDateVisit, comment, id) {
        let divCard = document.createElement("div");
        divCard.innerHTML = `<p class="paragraph">${userName}</p>
        <p class="doctor paragraph">${select}</p>
        <p class="visit-visible paragraph">Цель визита: ${purpose}</p>
        <p class="visit-visible paragraph">Дата визита: ${date}</p>
        <p class="visit-cardio-visible paragraph">Давление: ${pressure}</p>
        <p class="visit-cardio-visible paragraph">Индекс маси тела: ${indexWeight}</p>
        <p class="visit-cardio-visible paragraph">Заболевания: ${illness}</p>
        <p class="visit-age-visible paragraph">Возраст: ${age}</p>
        <p class="visit-dantist-visible paragraph">Дата последнего визита: ${lastDateVisit}</p>
        <p class="visit-visible paragraph">Комментарий: ${comment}</p>
        <button id=${id} class="close-card">x</button>
        <button class='showMore'>Показать больше...</button>`;
        divCard.classList.add("main-card");
        document.getElementById("mainCardId").appendChild(divCard);
        showText('mainCardId');
        const visitVisible = document.getElementsByClassName("visit-visible");
        if(comment === "") {
            visitVisible[visitVisible.length - 1].style.display = "none";
        }
    }
    addCartItem(item) {
        arrCard.push(item);
        localStorage.setItem('item', JSON.stringify(arrCard));
        Visit.createCard(item.userName, item.select, item.purpose, item.date, item.pressure, item.indexWeight,
            item.illness, item.age, item.lastDateVisit, item.comment, item.id)
    }
    createVisit(){
        this.addCartItem({
            id: Date.now(),
            userName: this._fullName,
            select: sel.value,
            purpose: this._purposeVisit,
            date: this._dateVisit,
            pressure: pressure.value,
            indexWeight: indexWeight.value,
            illness: illness.value,
            age: age.value,
            lastDateVisit: lastDateVisit.value,
            comment: this._comment
        });
    }
}

for(let i = 0; i < arrCard.length; i++) {
    Visit.createCard(arrCard[i].userName, arrCard[i].select, arrCard[i].purpose, arrCard[i].date, arrCard[i].pressure, arrCard[i].indexWeight, arrCard[i].illness, arrCard[i].age, arrCard[i].lastDateVisit, arrCard[i].comment);
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
button.addEventListener("click", modalVisit.open.bind(modalVisit));

document.addEventListener('click', function(event) {

    if(event.target.classList.contains('close-card')) {
        const divCard = event.target.parentNode;
        let id = event.target.getAttribute('id');
        let index = arrCard.map(card => card.id.toString()).indexOf(id);
        arrCard.splice(index, 1);

        localStorage.setItem('item', JSON.stringify(arrCard));
        divCard.remove();
        showText('mainCardId');
    }

    if(event.target.classList.contains('showMore')) {
        const divCard = event.target.parentNode;
        divCard.classList.add('size');
        visibleMove(event.target);
    }

    const modal = document.getElementById('modal');
    if (!modal.contains(event.target) && !button.contains(event.target)) {
        modalVisit.close();
    }
});

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
        if ( this._purposeVisit !== "" && this._lastDate !== "" && this._fullName !== "" &&
            this._dateVisit !== "") {
            newVisit = new Dentist(purpose.value, lastDateVisit.value, userName.value,
                date.value, comment.value);
            newVisit.createVisit();
        } else {
            alert('Попребуйте еще раз! Для записи к врачу нужно заполнить все поля!')
        }
    }
    if(select.value ==='Терапевт') {
        if (this._purposeVisit !== "" && this._age !== "" && this._fullName !== "" && this._dateVisit !== "") {
            newVisit = new Therapist(purpose.value, age.value, userName.value,
                date.value, comment.value);
            newVisit.createVisit();
        } else {
            alert('Попребуйте еще раз! Для записи к врачу нужно заполнить все поля!')
        }
    }
    if(select.value ==='Кардиолог') {
        if (this._purposeVisit !== "" && this._normalPressure !== "" && this._massIndex !== ""
            && this._pastIllnesses !== "" && this._age !== "" && this._fullName !== "" && this._dateVisit !== "") {
            newVisit = new Cardiologist(purpose.value, pressure.value, indexWeight.value,
                illness.value, age.value, userName.value, date.value, comment.value);
            newVisit.createVisit();
        } else {
            alert('Попребуйте еще раз! Для записи к врачу нужно заполнить все поля!')
        }
    }
    modalVisit.close();
});

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

let dropContainer = document.getElementById("mainCardId"); // Drag'n'Drop
    dropContainer.onmousedown = function (e) {
        let dropCard;
        if (e.target.querySelectorAll(".paragraph") && !e.target.classList.contains("showMore")) {
            dropCard = e.target.parentNode;
        }
        if (e.target.classList.contains("main-card")) {
            dropCard = e.target;
        }
        let coords = getCoords(dropCard);
        let dropMainContainer = document.getElementById("main");
        let coordsContainer = getCoords(dropMainContainer);
            let shiftX = e.pageX - coords.left;
            let shiftY = e.pageY - coords.top;
            let shiftYB = e.pageY - coords.bottom ;
            let shiftXR = e.pageX - coords.right;
            dropCard.style.position = 'absolute';
            dropCard.style.zIndex = "999";
            function moveAt(e) {
                if(coordsContainer.top <= (e.pageY - shiftY) && coordsContainer.left <= (e.pageX - shiftX)
                && coordsContainer.bottom > (e.pageY - shiftYB) && coordsContainer.right >= (e.pageX - shiftXR)) {
                    dropCard.style.left = (e.pageX - shiftX) - 20 + 'px';
                    dropCard.style.top = (e.pageY - shiftY) - 10 + 'px';
                }
            }

            document.onmousemove = function (e) {
                moveAt(e);
            };

            dropCard.onmouseup = function () {
                document.onmousemove = null;
                dropCard.onmouseup = null;
            };
            dropCard.ondragstart = function () {
                return false;
            };
    };


function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        bottom: box.top + box.height + pageYOffset,
        right: box.left + box.width + pageXOffset
    }
}
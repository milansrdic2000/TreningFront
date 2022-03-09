import { TreningPlan } from './class/TreningPlan.js'
const getTrainingPlans = async (userId) => {
  try {
    const url = `http://localhost:5000/trainingplan/user/${userId}`
    console.log(userId)
    console.log(url)
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    //uzimamo prvi da testiramo

    const { _id, ime, brojDana, brojCiklusa, isGlobal, dani } = data.data[0]

    let plan = new TreningPlan(_id, ime, brojDana, brojCiklusa, isGlobal, dani)
    console.log(plan)
    addTrainingPlanToDom(plan)
  } catch (error) {
    console.log(error)
  }
}

//dodaj pojedinacni plan koji prosledimo u DOM

const planListDiv = document.querySelector('.trening-plan-list')
const addTrainingPlanToDom = (plan) => {
  const planElementHtml = `<div class="trening-plan-container">
              <h3>${plan.imePlana}</h3>
              <div class="plan-info">
                <div class="plan-status w-33">${'nepoznato'}</div>
                <div class="plan-difficulty w-33">Medium</div>
                <div class="remaining w-33">${
                  plan.brojDana * plan.brojCiklusa
                }</div>
              </div>
              <div class="plan-btn">
                <button><a href="training.html?nesto">Pogledaj</a></button>
              </div>
            </div>`

  planListDiv.insertAdjacentHTML('afterbegin', planElementHtml)
}
getTrainingPlans('6223d8a51eaf68caa3f85d51')

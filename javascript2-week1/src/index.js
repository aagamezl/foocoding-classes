/* // Get the button reference
const send = document.querySelector("#send");

// Add click event listener to the button
send.addEventListener("click", async () => {
  // Get the form reference
  const userInfo = document.querySelector("#user-info");
 
  const data = new FormData(userInfo);
 
  data.append("serialnumber", 12345);

  for (const pair of data.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
}); */

const createFoodList = () => {
  const food = ['Pizza', 'Hummus', 'Burger', 'Falafel', 'Pizza']
  const foodList = document.querySelector('.food-list')

  const fragment = document.createDocumentFragment()

  for (let index = 0; index < food.length; index++) {
    const element = food[index]

    const newFood = document.createElement('li')
    newFood.textContent = element
    newFood.id = element

    fragment.appendChild(newFood)
  }

  foodList.appendChild(fragment)
}

const deleteFoodElement = () => {
  const foodName = document.querySelector('#foodName')
  const deleteButton = document.querySelector('#deleteFood')
  const foodList = document.querySelector('.food-list')

  deleteButton.addEventListener('click', () => {
    if (foodName.value === '') {
      alert('Please enter a value to search')

      return
    }

    // let isDeleted = ''
    const listLength = foodList.children.length
    for (let index = 0; index < foodList.children.length; index++) {
      const element = foodList.children[index];

      if (foodName.value === element.textContent) {
        // isDeleted = 'X'
        element.remove()

        // break
      }/*  else {
        if (index === foodList.children.length -1) {
          alert('The element doesn\'t exist')
        }
      } */
    }

    // if (index === foodList.children.length) {
    //   alert('The element doesn\'t exist')
    // }

    if (listLength === foodList.children.length) {
      alert('The element doesn\'t exist')
    }

    // if (isDeleted === '') {
    //   alert('The element doesn\'t exist')
    // }
  })

  const newFood = document.createElement('div')
  newFood.textContent = 'Ribs'

  const parent = document.querySelector('#parent')

  document.querySelector('#foodName').setAttribute('required', true)
  console.log(document.querySelector('#foodName').attributes);

  parent.classList.remove('parent-class')

  parent.insertAdjacentElement('beforeEnd', newFood)
}



createFoodList()
deleteFoodElement()

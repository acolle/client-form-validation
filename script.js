// Create references to elements
const modal = document.getElementById('modal');
const form_html = document.getElementById('form-html');
const form_js = document.getElementById('form-js');
const inputElements = [
  document.getElementsByName('name')[1],
  document.getElementsByName('username')[1],
  document.getElementsByName('email')[1],
  document.getElementsByName('subject')[1],
  document.getElementsByName('message')[1],
  document.getElementsByName('analytics')[2],
  document.getElementsByName('analytics')[3],
  document.getElementsByName('terms')[1]
]

// Add event listeners
form_html.addEventListener('submit', submitForm);
form_js.addEventListener('submit', submitForm);
inputElements.forEach((item) => {
  item.addEventListener('input', (event) => {

    let name = event.target.name || item.name;
    let value = event.target.value;
    let nameError = document.getElementById(`${name}-error`);

    if (item.validity.valid) {
      nameError.innerHTML = "";
      nameError.classList.add("is-hidden");
    } else {
      let message = setErrorMessage(item, value);
      nameError.innerHTML = message;
      nameError.classList.remove("is-hidden");
    }
  });
});

// Declare additional variables
const existingUsernames = [ 'username', 'user1', 'user2' ];

function submitForm(event) {
  event.preventDefault();

  let isValid = true;

  // validate the form
  inputElements.forEach((item) => {
    let name = item.name;
    // let value = event.target.value;
    let nameError = document.getElementById(`${name}-error`);
    if (!item.validity.valid) {
      let message = setErrorMessage(item);
      nameError.innerHTML = message;
      nameError.classList.remove("is-hidden");
      isValid = false;
    }
  });

  if (isValid) {
    toggleModal(); // submit form
    form_js.reset(); // clear form
  }
}

function submitFormHtml() {
  toggleModal();
  form_html.reset();
}

function setErrorMessage(item, value) {

  if (item.name === 'username' && existingUsernames.includes(value)) {
    return 'This username is not available';
  }

  if (item.validity.valueMissing) {
    if (item.name === 'analytics') {
      return 'Select an option';
    } else if (item.name === 'terms') {
      return 'You must aggree to our terms & conditions before continuing';
    } else {
      return `Specify a ${item.name}`;
    }
  } else if (item.validity.typeMismatch) {
    return `Wrong ${item.name} format`;
  } else if(item.validity.tooShort) {
    return `${item.name.charAt(0).toUpperCase().concat(item.name.slice(1))} should be at least ${ item.minLength } characters; you have ${ value.length }.`;
  }
}

// Determine which form validation method to use
function displayForm(input) {
  let form = input.value;
  if (form === 'html') {
    form_html.classList.remove("is-hidden");
    form_js.classList.add("is-hidden");
  } else {
    form_js.classList.remove("is-hidden");
    form_html.classList.add("is-hidden");
  }
}

// Show/hide form submission modal
function toggleModal() {
  if (modal.classList.contains('is-active')) {
    modal.classList.remove("is-active");
  } else {
    modal.classList.add("is-active");
  }
}

function clearForm() {
  form_html.reset();
  form_js.reset();
}

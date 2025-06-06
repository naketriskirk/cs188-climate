//THIS DOESNT USE THE REACT COMPONENT
// Create a container for the button
const container = document.createElement('div');
container.id = 'web-rating-button-container';
container.style.position = 'fixed';
container.style.top = '20px';
container.style.right = '20px';
container.style.zIndex = '99999';
document.body.appendChild(container);

// Create the button
const button = document.createElement('button');

button.style.width = '75px';
button.style.height = '75px';
button.style.backgroundColor = '#ffffff';
button.style.color = 'none';
button.style.border = '5px solid #507b00';
button.style.borderRadius = '50%';
button.style.display = 'flex';
button.style.alignItems = 'center';
button.style.justifyContent = 'center';
button.style.padding = '0';
button.style.cursor = 'pointer';

const logo = document.createElement('img');
logo.src = chrome.runtime.getURL('logo.png');
logo.alt = 'Verdant Logo';
logo.style.width = '50px';
logo.style.height = '50px';
logo.style.objectFit = 'contain';


// Add a click event listener to the button
button.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'open_extension' });
});

// Append logo to button
button.appendChild(logo);

// Append the button to the container
container.appendChild(button);
//THIS DOESNT USE THE REACT COMPONENT
// Create a container for the button
const container = document.createElement('div');
container.id = 'web-rating-button-container';
container.style.position = 'fixed';
container.style.top = '20px';
container.style.right = '20px';
container.style.zIndex = '1000';
document.body.appendChild(container);

// Create the button
const button = document.createElement('button');
const pageTitle = new URL(window.location.href).origin; // Extract the base URL up to .com
button.textContent = `Score for: ${pageTitle}`; // Set dynamic text

button.style.padding = '10px';
button.style.fontSize = '14px';

// Add a click event listener to the button
button.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'open_extension' });
});

// Append the button to the container
container.appendChild(button);

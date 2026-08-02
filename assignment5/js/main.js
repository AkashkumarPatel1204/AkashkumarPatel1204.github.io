// functionality for showing/hiding the comments section
document.addEventListener("DOMContentLoaded", () => {

const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

commentWrapper.style.display = 'none';
showHideBtn.setAttribute('aria-expanded', 'false');
showHideBtn.setAttribute('aria-controls', 'comments-section');

// mouse click
showHideBtn.onclick = function() {
	toggleComments();
};

// keyboard activation
showHideBtn.addEventListener('keydown', function (e) {
	if (e.key === 'Enter' || e.key=== ' ') {
		e.preventDefault();
		toggleComments();
	}
});
function toggleComments() {
	const isHidden = commentWrapper.style.display === 'none';
	
  if (isHidden) {
	showHideBtn.textContent = 'Hide comments';
    commentWrapper.style.display = 'block';
	showHideBtn.setAttribute('aria-expanded', 'true');
  } else {
    showHideBtn.textContent = 'Show comments';
    commentWrapper.style.display = 'none';
	showHideBtn.setAttribute('aria-expanded', 'false');
  }
};

// functionality for adding a new comment via the comments form

const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');

form.onsubmit = function(e) {
  e.preventDefault();
  submitComment();
};

function submitComment() {
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');
  const nameValue = nameField.value.trim();
  const commentValue = commentField.value.trim();
  
  if (!nameValue || !commentValue) {
	  return;
  }

  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);

  nameField.value = '';
  commentField.value = '';
}
});

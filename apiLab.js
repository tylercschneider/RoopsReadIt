// Intial Element Hides
$('#fail').hide();
$('#posts').hide();

// EVENT LISTENER ON # of POSTS
let submit = document.getElementById('submit');
submit.addEventListener("click", ()=> {
	let numChoose = document.getElementById('numChoose');
	let chosen = numChoose.value;
	redditCall(chosen);
	numChoose.value = "";
	$('#setup').slideUp();
});
let topTitle = document.getElementById('title');


topTitle.addEventListener("click", ()=> {
	$('#posts').slideUp();
	$('#setup').slideDown();
	let posts = document.getElementById('posts');
	posts.innerHTML = '';

});




// MAKE API CALL TO REDDIT
function redditCall(qty) { 
	let url = "https://www.reddit.com/r/awww/.json";

	$.get(url).done((data)=> {doneResponse(data, qty)}).fail(failResponse());

}

// POSITIVE RESPONSE HANDLER
function doneResponse(data, qty) {
	console.log(data);
	let posts = data.data.children;
	let lego = [];
	if(qty>posts.length){
		qty=posts.length;
	}
	for(let i = 0; i<qty; i++) {
		let title = posts[i].data.title;
		let image = posts[i].data.url;
		let link = posts[i].data.preview.images[0].source.url;
		let post = new Post(i, title, image, link);
		lego.push(post);
		post.addToDom();
	}
	console.log(lego);
	$('#fail').hide();
	$('#posts').slideDown();
}

// NEGATIVE RESPONSE / TEMP HANDLER
function failResponse() {
	$('#fail').show();
}

// BUILDS POSTS
class Post {
	constructor(i, title, image, link){
		this.id = i;
		this.title = title;
		this.image = image;
		this.link = link;
	}
	addToDom() {
		let postTitle = document.createElement('h3');
		let postImage = document.createElement('img');
		let postLink = document.createElement('a');

		postTitle.textContent = this.title;
		postImage.setAttribute('src', this.image);
		postLink.setAttribute('href', this.link);

		let postCard = document.createElement('div');
		postCard.setAttribute('class', 'postCard');
		postLink.appendChild(postImage);
		postLink.appendChild(postTitle);
		postCard.appendChild(postLink);
		let target = document.getElementById('posts');
		target.appendChild(postCard);
	}
}
const http = require('http');
var snoowrap = require('snoowrap');

const hostname = '127.0.0.1';
const port = 3000;

const reddit = new snoowrap({
	userAgent: 'Reddit Rewind',
	clientId: 'H7q-VgszU43xdw',
	clientSecret: '5yC84krS2y03k9KEtKsgThDe7vIaQA',
	refreshToken: '14546719-MzirzYqb_MJuYLgJGrvVuDMcTPDg9A'
});

var array = [];

reddit.getSubmission('jpsm1a').expandReplies().then(com => {
	sortComments(com.comments)
})

function sortComments(comments) {
	comments.sort((a, b) => (a.created_utc - b.created_utc))
	// comments.forEach(com => {
	// 	console.log(com.body)
	// });

	for (var i = 0; i < comments.length - 1; i++) {
		if (comments[i].body != '[deleted]') {
			const date = new Date(comments[i].created_utc * 1000)
			console.log("From: " + comments[i].author.name + " at " + date)
			console.log(comments[i].body)
			console.log()
			console.log("======================================================================")
			console.log()
			const waitTime = comments[i + 1].created_utc - comments[i].created_utc
			sleep(waitTime * 1000)
		}
	}
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

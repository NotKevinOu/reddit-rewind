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
var waitTime = 0;

reddit.getSubmission('jpsm1a').expandReplies().then(com => {
	sortComments(com.comments)
})

function sortComments(comments) {
	comments.sort((a, b) => (a.created_utc - b.created_utc))
	for (var i = 0; i < comments.length - 1; i++) {		// last comment will not be displayed
		displayComment(comments, i)
	}
}

function displayComment(comments, i) {
	if (i > 0) {
		waitTime += (comments[i].created_utc - comments[i - 1].created_utc) * 1000
		setTimeout(function () {
			printComment(comments, i);
		}, waitTime)
	} else {
		printComment(comments, i);
	}

}

function printComment(comments, i) {
	// if (comments[i].parent_id.substring(0, 2) == "t3") {
	if (comments[i].body != '[deleted]') {
		const date = new Date(comments[i].created_utc * 1000)
		if (comments[i].author_flair_text == null) {
			console.log(`${comments[i].author.name} | ${date}`)

		} else {
			console.log(`${comments[i].author.name} [${comments[i].author_flair_text}] | ${date}`)
		}
		console.log()
		console.log(comments[i].body)
		console.log()
		console.log(`============================== [ i ===  ${i} ] ======================================`)
		console.log()
	}

	// for (var i = 0; i < comments[i].replies.length - 1; i++) {			// last comment will not be displayed
	// 	const waitTime = comments[i + 1].created_utc - comments[i].created_utc
	// 	setTimeout(displayComment, waitTime, comments.replies, i)
	// }
	// } else if (comments[i].parent_id.substring(0, 2) == "t1") {
	// 	if (comments[i].body != '[deleted]') {
	// 		const date = new Date(comments[i].created_utc * 1000)
	// 		if (comments[i].author_flair_text == null) {
	// 			console.log(`${comments[i].author.name} | ${date}`)

	// 		} else {
	// 			console.log(`${comments[i].author.name} [${comments[i].author_flair_text}] | ${date}`)
	// 		}
	// 		console.log()
	// 		console.log(comments[i].body)
	// 		console.log()
	// 		console.log(`     Replying to:`)
	// 		var parentComment = comments.find(com => com.parent_id == comments[i].parent_id)
	// 		console.log(`     Replying to:`)
	// 		console.log(`     ${parentComment.body}`)
	// 		console.log("======================================================================")
	// 		console.log()
	// 	}
	// }
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

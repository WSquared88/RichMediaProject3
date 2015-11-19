// The client ID is obtained from the Google Developers Console
// at https://console.developers.google.com/.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = '69824444425-vbojacg730vvi1o8sq2rcha86foiabj0.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() 
{
	console.log("API is ready");
	gapi.auth.init(function() 
	{
		console.log("calling checkAuth");
		//checkAuth();
		window.setTimeout(checkAuth, 1);
	});
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() 
{
	console.log("I made it into auth");
	gapi.auth.authorize(
	{
		client_id: OAUTH2_CLIENT_ID,
		scope: OAUTH2_SCOPES,
		immediate: true
	}, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) 
{
	console.dir(authResult);
	console.log("Made it into the handler");
    

    
	if (authResult && !authResult.error) 
	{
		// Authorization was successful. Hide authorization prompts and show
		// content that should be visible after authorization succeeds.
		$('.pre-auth').hide();
		$('.post-auth').show();
		loadAPIClientInterfaces();
        
        setTimeout(function() {
              var q = "cats";
              var request = gapi.client.youtube.search.list({
                q: q,
                part: 'snippet'
              });

              request.execute(function(response) {
                console.dir(response);
              });
        }, 1000);
        
	} 
	else 
	{
	// Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
	// client flow. The current function is called when that flow completes.
		$('#login-link').click(function() 
		{
			gapi.auth.authorize(
			{
				client_id: OAUTH2_CLIENT_ID,
				scope: OAUTH2_SCOPES,
				immediate: false
			}, handleAuthResult);
		});
	}
    
    
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
function loadAPIClientInterfaces() 
{
	console.log("Finally made it to the end");
	gapi.client.load('youtube', 'v3', function() 
	{
		handleAPILoaded();
	});
}
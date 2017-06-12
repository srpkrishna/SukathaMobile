var BaseURL = "https://sukatha.com/api/";

const serverCall = {
	fetch:function(url,successFunction){
		this.connect('GET',url,'',successFunction);
	},
	connect:function (reqType,reqURL,reqdata,successFunction)
	{
		var body = JSON.stringify(reqdata);
		makeServerCall(reqType,BaseURL+reqURL,body,successFunction,successFunction);
	}

};

function makeServerCall(reqType,serviceUrl,reqdata,successFunction,errorFunction)
{

		var myRequest;

		if(reqType == 'GET'){
			myRequest = new Request(serviceUrl);
		}else{
			myRequest = new Request(serviceUrl, {method: reqType, body: reqdata});
		}

		fetch(myRequest)
		.then(function(response) {
				if(response.status == 200) return response.json();
				else throw new Error('Something went wrong on api server!');
		})
		.then(function(response) {
				successFunction(response);
		})
		.catch(function(error) {
				errorFunction(error);
		});
}
export default serverCall

var BaseURL = "https://sukatha.com/api/";
BaseURL = "http://192.168.1.5:3000/api/";

const serverCall = {
	fetch:function(url,successFunction,errorFunction){
		this.connect('GET',url,'',successFunction,errorFunction);
	},
	directFetch:function(url,successFunction,errorFunction){
		makeServerCall('GET',url,'',successFunction,errorFunction);
	},
	connect:function (reqType,reqURL,reqdata,successFunction,errorFunction)
	{
		var body = JSON.stringify(reqdata);
		makeServerCall(reqType,BaseURL+reqURL,body,successFunction,errorFunction);
	}

};

function makeServerCall(reqType,serviceUrl,reqdata,successFunction,errorFunction)
{

		var myRequest;

		if(reqType == 'GET'){
			myRequest = new Request(serviceUrl,{timeout:1000});
		}else{
			myRequest = new Request(serviceUrl, {timeout:1000,method: reqType, body: reqdata,headers: {"Content-Type": "application/json"}});
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
				if(errorFunction){
					errorFunction(error);
				}
		});
}
export default serverCall

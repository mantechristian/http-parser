var form = document.getElementById('url-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var uri = document.getElementById('uri-box').value;
    var uriParts = parseUri(uri);
    render(uriParts);
});

function render(uriParts) {
    document.getElementById('parts').className = '';
    for (var key in uriParts) {
        document.getElementById(key + '-value').innerHTML = uriParts[key];
    }
}

function parseUri(uri) {
    var uriParts = {
        scheme: '',
        authority: '',
        path: '',
        query: '',
        fragment: ''
    };
    
    // add your code here

    /**
    	part -- terminated by

		scheme -- :// 
		authority -- / 
		path -- ?
		query -- #
		fragment -- end of uri 
    **/
    
    /*split string into string array*/
    var uriSplit = uri.split("");
    
    /*string to contain array substrings*/
    var s = "";
    
    /*flag to check if authority has been found*/
    var foundS = false;
    var foundA = false;
    var foundP = false;
    /*iterate through string array*/

    /** 
    file:///home/christian/Desktop/126mp1/index.html
   	file:///C:/Users/cf1/Downloads/CMSC126-WebEngineering.pdf
	https://en.wikipedia.org/wiki/Query_string#Structure
	https://awesome:iamcool@localhost/home/#about
	mailto:fred@example.com
	https://www.google.com.ph
   	**/
   	for(var i = 0; i < uriSplit.length; i++) {
   		s += uriSplit[i];
   		if(foundS == false && ((s.includes(":") && uriSplit[i+1] != "/") || s.includes("://"))) {
   			// window.alert(s);
   			if(s.includes(":")) {
   				s = s.replace(":", "");	
   			}
   			if(s.includes("/")) {
   				s = s.replace("/", "");	
   			}
   			if(s.includes("/")) {
   				s = s.replace("/", "");	
   			}
   			uriParts.scheme = s;
   			foundS = true;
   			s = "";
   		}
   		else if(foundA == false && ((s.includes("/") && uriParts.scheme != "") || (i + 1 == uriSplit.length && s != ""))) {
   			s = s.replace("/", "");
   			uriParts.authority = s;
   			foundA = true;
   			s = "";	
   		}	
   		else if(foundP == false && ((s.includes("?") || s.includes("#")) || (i + 1 == uriSplit.length && s != ""))) {
   			if(s.includes("?")) {
   				s = s.replace("?", "");	
   				uriParts.path = s;
   				s = "?";
   			}
   			else if(s.includes("#")) {
   				s = s.replace("#", "");
   				uriParts.path = s;
   				s = "#";
   			}
   			else {
   				uriParts.path = s;
   			}
   			foundP = true;
   		}
   		else if(s.includes("?")) {
   			if(s.includes("#")) {
   				s = s.replace("#","");
   				if(s.includes("?")) {
   					s = s.replace("?","")
   				}
   				uriParts.query = s;
   				s = "#";
   			}
   			else if(i == uriSplit.length - 1){
   				s = s.replace("?", "");
	   			uriParts.query = s;
	   			s = "";
   			}
   		}
   		else if(i == uriSplit.length - 1) {
   			if(s.includes("#")) {
   				s = s.replace("#","");
   				uriParts.fragment = s;
   			}
   		}
   	}

    return uriParts;
}
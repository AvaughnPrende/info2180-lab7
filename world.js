$(document).ready(function(){
    let httpRequest;
    let searchButton  = $("#lookup");
    let searchBar     = $("#country");
    let resultDiv     = $("#result");
    let checkbox      = $("#checkbox");
    let searchTerm;
    let url;
    
    function getSearchTerm(){
        return searchBar[0].value;
    }
    
    searchButton.on("click", function(element){
        element.preventDefault();
        
        searchTerm  = getSearchTerm().toLocaleLowerCase().trim();
        
        if (checkbox.prop("checked")){
            url         = 'https://info2180-lab7-avaughnprende.c9users.io/world1.php?all=true';
        }
        else{
            url         = 'https://info2180-lab7-avaughnprende.c9users.io/world1.php?country=' + searchTerm;
        }
        
        console.log(searchTerm);
        console.log(checkbox.prop("checked"));
        httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = displaySearchResult;
        httpRequest.open("GET", url);
        httpRequest.send();
        
    });
    
    function displaySearchResult(){
        if (httpRequest.readyState === httpRequest.DONE){
            if(httpRequest.status  === 200){
                if(searchResultFound(httpRequest.responseText)){
                     insertText(httpRequest.responseText);
                }
                else{
                    insertText(`"${searchTerm}" NOT FOUND!`);
                }
            }
        }
    }
    
    function insertText(text){
        resultDiv.html(text);
    }
    
    function searchResultFound(searchResponse){
        return (!searchResponse.endsWith("<ul></ul>"));
    }
})
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
        
        searchTerm  = getSearchTerm();
        
        if (checkbox.prop("checked")){
            url         = 'https://info2180lab-7-avaughnprende.c9users.io/world.php/?all=true';
        }
        else{
            url         = 'https://info2180lab-7-avaughnprende.c9users.io/world.php/?country=' + searchTerm.toLocaleLowerCase().trim();
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
                    resultDiv.empty();
                     insertText(httpRequest.responseText);
                }
                else{
                    insertText('0 Results found');
                }
            }
        }
    }
    
    function insertText(text){
        if(url.endsWith("all=true")){
            resultDiv.html("<h3>All Countries Listed</h3>")
        }
        else{
            resultDiv.html(`<h3>Search results found for "${searchTerm}"` );
        }
        resultDiv.append(text);
    }
    
    function searchResultFound(searchResponse){
        return (!searchResponse.endsWith("<ul></ul>"));
    }
})
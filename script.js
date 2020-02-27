$('#searchForm').submit( function(e) {
  e.preventDefault();
  let url = 'https://en.wikipedia.org/w/api.php';
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'jsonp',
    data: 
    {
      "action": "query",
      "format": "json",
      "prop": "extracts",
      "generator": "search",
      "exsentences": "1",
      "exlimit": "max",
      "exintro": 1,
      "explaintext": 1,
      "gsrsearch": $('#search').val()
    }
  })
    .done(function(data) {
      //clear the list
      $('#searchResults').empty();

      //output the results, if found
      if (!data.hasOwnProperty('query'))
        $('#searchResults').append('<li style="margin:20px; text-align:center"><b>No results found. Please try again.</b></li>');
      else {
        let searchData = data.query.pages;
        Object.keys(searchData).forEach( i => {
           $('#searchResults').append('<a target="_blank" href="https://en.wikipedia.org/?curid=' + searchData[i].pageid +'"><li><h2>' + searchData[i].title + '</h2><p>' + searchData[i].extract + '</p></li></a>');
         })
      }
      
      //clear the search term
      $('#search').val('');
    })
  
    .fail(function(xhr, status, error) {
      alert('Failed to get data.');
      console.log('Failed to get data: ' + status);
    });
})
$(document).ready(function() {
    $('#searchText').on('input',function() {
        let searhText = $('#searchText').val();
        getBooks(searhText);


    })
})

function getBooks(searchText) {

    axios.get('https://www.googleapis.com/books/v1/volumes?q='+searchText)
        .then(function(response) {
            let books = [...response.data.items];
            let temp = '';
            books.forEach(function(item) {
                let id = item.id;
                let title = item.volumeInfo.title;
                let subtitle = item.volumeInfo.subtitle;

                let authors = item.volumeInfo.authors;
                let publisher = item.volumeInfo.publisher;
                let publishedDate = item.volumeInfo.publishedDate;
                let description = item.volumeInfo.description;
                let imageLink = item.volumeInfo.imageLinks.smallThumbnail;
                let previewLink = item.volumeInfo.previewLink;
                let read = item.accessInfo.webReaderLink;
                 temp += `
                <div class="col-md-3 text-center">
                <img src=${imageLink} class="img-fluid" alt="">
                <h5>${title}</h5>
                <h6>${authors}</h6>
                <p>${description.substring(0,80)}    <a href=${previewLink} >Read More....</a></p>
                <a href="${read}"><button class="btn btn-info mb-2">Read Online</button></a>

            </div>
                `;


            });
            document.getElementById('books').innerHTML = temp;
            


        })
        .catch(function(err) {
           
            console.log(err);
            
        })

}
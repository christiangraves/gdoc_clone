// loads existing documents
const loadDocs = function () {
    $.getJSON('/api/applist')
        .then(function (data) {
            const docItem = data.map((element) =>
                `
                <a class="open-doc-btn" id='${element._id}' href="/doc/${element._id}">
                <div class="docPrev">
                        ${element.docContent}
                    <section class="caption">
                        <span class="captionLabel">
                        <h2>${element.docTitle}</h2>
                        <div class="labelGroup">
                            <i class="fas fa-sticky-note"></i>
                            <h4> Open October 4, 2018</h4>
                            <i class="fas fa-ellipsis-v"></i>
                        </div>
                        </span>
                    </section>
                    <i class="fas fa-times" id='${element._id}'></i>
                </div>
                </a>
                `
            )
            $('#gdoclist').html(docItem);
            // $('.open-doc-btn').on('click', openDoc);
            $('.fa-times').on('click', deleteDoc);
        })
};

   /**
     * Creates New Document.
     * @param {event} event - Creates a new doc in response to plus submit.
     * Adds the title and text content to the db
     */
const createDoc = function (event) {
    event.preventDefault();
    const newDocument = {
        docTitle: $('#input-title').val(),
        docContent: $('#input-content').val()
    };
    $.ajax({ url: '/add', method: 'POST', data: newDocument }).then(function (res) {
        loadDocs();
    });
};

// Deletes documents

const deleteDoc = function (event) {
    event.preventDefault();
    const id = event.target.id;
    // @async
    $.ajax({ url: `/delete/${id}`, method: "DELETE" }).then(function () {
        loadDocs();
    });
}

loadDocs();

// Listener submit button
$('form').on('submit', createDoc);


// Search Function
let searchInput = $('.search-main').val();
// add search here 

---
---

var filterResults = function (results) {
    var targets = $("ul.posts>li");
    $('.category').show();
    if (results.length <= 0) {
        targets.show();
        return;
    }
    targets.hide();
    for (result of results) {
        $('#' + result.item).show();
    }
    $(".category:not(:has(>ul.posts>li:visible))").hide();
    window.scrollTo(0, 0);
};

$.getJSON('{{ "/tools.json" | relative_url }}', function (data) {
    var options = {
        shouldSort: true,
        includeScore: true,
        includeMatches: true,
        tokenize: true,
        threshold: 0.2,
        maxPatternLength: 32,
        minMatchCharLength: 3,
        id: "id",
        keys: [{
            name: 'title',
            weight: 0.4
        }, {
            name: 'category',
            weight: 0.1
        }, {
            name: 'link',
            weight: 0.4
        }, {
            name: 'tags',
            weight: 0.1
        }]
    };
    var fuse = new Fuse(data, options);

    var paramQ = /q=(\w{2,})/.exec(window.location.search)
    if(paramQ !== null && paramQ[1] !== null) {
        $('#search').val(paramQ[1]);
        var results = fuse.search(paramQ[1]);
        filterResults(results);
    }

    $('#search').keyup(function () {
        var q = $(this).val();
        var results = fuse.search(q);
        filterResults(results);
    });
});

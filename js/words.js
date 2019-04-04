//When the page is fully loaded the page the script will kick in
$(document).ready(function () {

    //Ajax call for the API data
    function getTargets(apiFn, sourceWord, max, response) {
        $.ajax({
            dataType: "json",
            type: 'Get',

            //Using datamuse API for the data
            url: '//api.datamuse.com/words?' + apiFn + '=' + sourceWord + '&max=' + max,
            success: function (data) {

                //Validation for the words being queried by user
                if (sourceWord == "") {
                    alert("Please enter a word.");
                } else if (sourceWord.includes(" ")) {
                    alert("Center word cannot contain a space - API issue");
                } else {
                    response(sourceWord, $.map(data, function (item) {
                        return item["word"];
                    }), apiFn);
                }
            },
        });
    }


    //Variables declared for the links, nodes, width of cells and the graph size
    var link;
    var node;
    var rect_width = 150;
    var width = 1000,
        height = 500;
    var svg = d3.select("#graph").append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 960 500")
        .attr("preserveAspectRatio", "xMidYMid meet");
    var nodes = {};


    //Function to handle the user entering a new word
    function response(sourceWord, followers, apiFn) {

        //If the word the user enters has no synonyms - this means the word doesn't exist
        if (followers.length == 0) {
            alert("Word doesn't exist - please enter another word.");
            n["name"] = "error";
        }


        //Generating nodes and links based off how many responses the trigger word has
        for (var n in nodes) {
            if (n != sourceWord) {
                delete nodes[n];
            }
        }
        svg.selectAll(".link").remove();
        svg.selectAll(".node").filter(function (n) {
            return n["name"] != sourceWord
        }).remove();
        svg.selectAll(".node").filter(function (n) {
                return n["name"] === sourceWord
            })
            .attr("class", "triggernode");
        svg.selectAll(".triggernode").remove();
        links = [];
        for (var i = 0; i < followers.length; i++) {
            links.push({
                source: sourceWord,
                target: followers[i],
                type: "rel_jjv"
            });
        }


        links.forEach(function (link) {
            link.source = nodes[link.source] || (nodes[link.source] = {
                name: link.source
            });
            link.target = nodes[link.target] || (nodes[link.target] = {
                name: link.target
            });
        });

        //Setting the layout of the visualisation
        var force = d3.layout.force()
            .nodes(d3.values(nodes))
            .links(links)
            .size([width, height])
            .linkDistance(150)
            .charge(-800)
            .on("tick", tick)
            .start();

        link = svg.selectAll(".link")
            .data(force.links())
            .enter().append("line")
            .attr("class", "link");

        node = svg.selectAll(".node")
            .data(force.nodes())
            .enter().append("g")
            .attr("class", function (d, i) {
                if (d["name"] == sourceWord) return "triggernode";
                else return "node";
            })
            .call(force.drag)
            .on("click", function (d, i) {
                click(d, i, sourceWord, apiFn);
            });

        node.append("rect")
            .attr("width", rect_width)
            .attr("height", 30)
            .attr("rx", 50)
            .attr("ry", 15);

        node.append("text")
            .attr("x", rect_width / 2)
            .attr("dy", "1.4em")
            .text(function (d) {
                return d.name;
            });
    }

    //Dealing with coords when dragged
    function tick() {
        link
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node
            .attr("transform", function (d) {
                return "translate(" + (d.x - rect_width / 2) + "," + d.y + ")";
            });
    }


    //Centre node clickable - Setting max responses
    function click(d, i, sourceWord, apiFn) {
        if (d["name"] === sourceWord) {
            var node = d3.select(".triggernode")
                .attr("class", "selectedtrigger triggernode");
            node.select("text").remove();
            node.on("click", null);
            node.filter(function (n) {
                    return n["name"] == sourceWord;
                })
                .append("foreignObject")
                .attr("x", "15")
                .append("xhtml:input").attr("id", "sourceinput").attr("type", "text").attr("value", sourceWord)
                .on("keypress", function (d, i) {
                    if (event.keyCode == 13) getTargets("rel_syn", $("#sourceinput").val(), 10, response);
                });
        } else {
            var nextApiFn;
            if (apiFn == "rel_syn") {
                nextApiFn = "rel_syn";
            } else {
                nextApiFn = "rel_syn";
            }
            getTargets(nextApiFn, d["name"], 15, response);
        }

    }

    getTargets("rel_syn", "start", 15, response);
});
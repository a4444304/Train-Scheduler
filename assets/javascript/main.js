var database = firebase.database();

$("#submitBttn").on("click", function(){
    event.preventDefault();
var nameInput = $("#nameInput").val().trim();
var destInput = $("#destInput").val().trim();
var freqInput = $("#freqInput").val().trim();
var dateInput = $("#dateInput").val().trim();

var schedule1 = {
    name:nameInput,
    dest:destInput,
    date:dateInput,
    freq:freqInput
    };

database.ref().push(schedule1);

});

database.ref().on("child_added", function(snapshot){

    var nameInput = snapshot.val().name;
    var destInput = snapshot.val().dest;
    var dateInput = snapshot.val().date;
    var freqInput = snapshot.val().freq;

    var origin = moment(dateInput, "HH:mm").subtract(1, "years");
    var differential = moment().diff(moment(origin), "minutes");
    var mod = differential % freqInput;
    var remainder = freqInput - mod;
    var next = moment().add(remainder, "minutes");

    var tr = $("<tr>");
    var td = $("<td>");
    var td2 = $("<td>");
    var td3 = $("<td>");
    var td4 = $("<td>");
    var td5 = $("<td>");

    td.text(nameInput);
    td2.text(destInput);
    td3.text(freqInput);
    td4.text(next);
    td5.text(remainder);

    tr.append(td);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    $("#tBody").append(tr);

}); 
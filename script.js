// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
	var headerDay = $("#currentDay");

	// dayjs variables
	var today = dayjs().format("dddd MMM, D");
	var currentHour = dayjs().hour();

	// global variables
	var tasks = [];
	var localStorageTasks = JSON.parse(localStorage.getItem("tasks")) || [];

	//header text
	headerDay.text(today);
	headerDay.css("font-weight", "bold");

	//sets current hour row color
	for (var i = 9; i < 18; i++) {
		var currentElement = $("#hour-" + i);
		if (currentHour == currentElement.data("t")) {
			currentElement.addClass("present");
		} else if (currentHour > currentElement.data("t")) {
			currentElement.addClass("past");
		} else if (currentHour < currentElement.data("t")) {
			currentElement.addClass("future");
		}
	}

	$(".saveBtn").on("click", function () {
		var parentId = $(this).parent().attr("id");
		var siblingText = $(this).parent().children("textarea").val();
		tasks.push({ id: parentId, text: siblingText });
		localStorage.setItem("tasks", JSON.stringify(tasks));
	});
});

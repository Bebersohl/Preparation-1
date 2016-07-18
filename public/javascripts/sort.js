$(document).ready(function(){
  $("#update-button").on("click", function(){
    $("#sort-form").submit(function(e){});
  });

  $("#reset-button").on('click', function(){
    $("#sort-form")[0].reset();
  });
});

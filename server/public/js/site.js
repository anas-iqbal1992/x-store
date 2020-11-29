$(document).ready(function () {
  $(document).on("click", "#addsubcat", function (e) {
    e.preventDefault();
    let id = +$(this).attr("data-id") + 1;
    $.ajax({
      type: "POST",
      url: `/category/add-sub-category`,
      data: { id: id },
      success: function (response) {
        $("#apndSubCat").append(response);
        $("#addsubcat").attr("data-id", id);
      },
    });
  });
  $(document).on("click", ".remove-sub", function (e) {
    e.preventDefault();
    $(`#subcat-${$(this).data("id")}`).remove();
  });
  $(document).ready(function () {
    $(".select-category").select2();
    $(".select-subcategory").select2();
  });
  $(".select-category").on("change", function () {
    $.ajax({
      type: "GET",
      url: `/product/get-sub-categories/${this.value}`,
      success: function (response) {
        $(".select-subcategory").html(response);
      },
    });
  });
  $(".summernote").summernote({
    height: 150,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['view', [ 'codeview', 'help']]
    ]
  });
  $('.file-upload').on('click', function(e) {
    e.preventDefault();
    $(`#${$(this).data('id')}`).trigger('click');
  });
  $('.visuallyhidden').on('change',function(){
    var size = this.files[0].size;
    if (size > 2000000) {
      return false;
    }
    var fileName = this.files[0].name.split(".");
    var ext = fileName[fileName.length - 1];
    var imgExt = new Array("jpeg", "png", "jpg");
    if (imgExt.indexOf(ext) != -1) {
      readURL(this);
    }
  });
});
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      console.log(`#${$(input).data('id')}`);
      $(`#${$(input).data('id')}`).attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
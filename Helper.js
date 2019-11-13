/**
 * Download Files With JS
 *
 * @param {string} urlToSend
 */
function downloadFile(urlToSend) {
  var req = new XMLHttpRequest();
  req.open("GET", urlToSend, true);
  req.responseType = "blob";
  req.onload = function(event) {
    var blob = req.response;
    var fileName = req
      .getResponseHeader("content-disposition")
      .replace("attachment; filename=", "");
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  req.send();
}

/**
 * Generate SLug Function
 *
 * @param {string} Text
 * @returns {string}
 */
function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/-+/g, "-")
    .replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, "");
}

/**
 *
 * Ajax Request With jQuery
 *
 * @param {string} form
 * @param {callable} beforeSend
 * @param {callable} success
 * @param {callable} done
 */
function ajax(form, beforeSend, success, done) {
  var data = new FormData($(form)[0]);
  $.ajax({
    url: $(form).attr("action"),
    method: $(form).attr("method"),
    dataType: $(form).data("dataType") ? $(this).data("dataType") : "json",
    data: data,
    contentType: false,
    cache: false,
    processData: false,
    beforeSend: beforeSend,
    success: success
  }).done(done);
}

/**
 * Preview Image
 *
 */
function preview() {
  $(".preview").on("change", function() {
    preview_target = $(this).data("preview-target");
    document.getElementById(preview_target).src = window.URL.createObjectURL(
      this.files[0]
    );
  });
}

/**
 * Handle Slug Input
 *
 */
$("input[name=slug]").each(function(i, e) {
  originField = $(e).attr("data-slug-origin");
  if (originField) {
    originElement = $("input[name=" + originField + "]");
    $(e).val(convertToSlug($(this).val()));
    originElement.keyup(function() {
      $(e).val(convertToSlug($(this).val()));
      return;
    });
    $(originElement.closest("form")).on("submit", function(ee) {
      $(e).val(convertToSlug($(originElement).val()));
    });
    originElement.blur(function() {
      $(e).val(convertToSlug($(this).val()));
      return false;
    });
  }
  $(e).keyup(function() {
    $(e).val(convertToSlug($(this).val()));
    return false;
  });
});
